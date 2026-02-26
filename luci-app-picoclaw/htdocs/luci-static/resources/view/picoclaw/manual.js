/*   Copyright (C) 2021-2026 LIKE2000-ART */
'use strict';
'require view';
'require fs';
'require ui';
'require rpc';

const CONFIG_PATH = '/etc/picoclaw/config.json';

const getConfig = rpc.declare({
    object: 'luci.picoclaw',
    method: 'get_config',
    expect: { '': {} }
});

const setConfig = rpc.declare({
    object: 'luci.picoclaw',
    method: 'set_config',
    params: ['content']
});

return view.extend({
    load: function () {
        return getConfig().then(function (result) {
            return result.content || '{}';
        }).catch(function () {
            return '{}';
        });
    },

    render: function (configContent) {
        var css = '\
            .config-editor-wrap { position: relative; } \
            .config-editor { \
                width: 100%; min-height: 500px; \
                font-family: "SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace; \
                font-size: 13px; line-height: 1.5; \
                padding: 12px; resize: vertical; \
                border: 1px solid #ccc; border-radius: 4px; \
                tab-size: 2; white-space: pre; \
                background: #fafafa; color: #333; \
            } \
            .config-editor:focus { \
                border-color: #5897fb; outline: none; \
                box-shadow: 0 0 0 2px rgba(88, 151, 251, 0.15); \
            } \
            .config-actions { margin-top: 12px; display: flex; gap: 8px; align-items: center; } \
            .config-msg { margin-left: 12px; font-size: 13px; } \
            .config-msg.ok { color: #4caf50; } \
            .config-msg.err { color: #f44336; } \
            .config-footer { \
                margin-top: 16px; text-align: right; font-style: italic; \
                display: flex; justify-content: space-between; align-items: center; \
            } \
            .config-path { font-size: 12px; color: #888; font-family: monospace; } \
        ';

        // Pretty-print if possible
        try {
            var parsed = JSON.parse(configContent);
            configContent = JSON.stringify(parsed, null, 2);
        } catch (e) { /* keep as-is */ }

        var textarea = E('textarea', {
            'class': 'config-editor',
            'spellcheck': 'false',
            'autocomplete': 'off',
            'autocorrect': 'off',
            'autocapitalize': 'off',
            'wrap': 'off'
        }, configContent);

        // Handle Tab key for indentation
        textarea.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
            }
        });

        var msgSpan = E('span', { 'class': 'config-msg' });

        var formatBtn = E('button', {
            'class': 'cbi-button cbi-button-neutral',
            'click': function () {
                try {
                    var obj = JSON.parse(textarea.value);
                    textarea.value = JSON.stringify(obj, null, 2);
                    msgSpan.className = 'config-msg ok';
                    msgSpan.textContent = '✓ ' + _('JSON format valid');
                } catch (e) {
                    msgSpan.className = 'config-msg err';
                    msgSpan.textContent = '✗ ' + _('JSON format error') + ': ' + e.message;
                }
            }
        }, _('Format JSON'));

        var saveBtn = E('button', {
            'class': 'cbi-button cbi-button-apply',
            'click': function () {
                var content = textarea.value;

                // Validate JSON
                try {
                    JSON.parse(content);
                } catch (e) {
                    msgSpan.className = 'config-msg err';
                    msgSpan.textContent = '✗ ' + _('JSON format error') + ': ' + e.message;
                    return;
                }

                saveBtn.disabled = true;
                saveBtn.textContent = _('Saving...');
                msgSpan.textContent = '';

                setConfig(content).then(function (res) {
                    if (res && res.code === 0) {
                        msgSpan.className = 'config-msg ok';
                        msgSpan.textContent = '✓ ' + _('Config saved, PicoClaw restarting...');
                    } else {
                        msgSpan.className = 'config-msg err';
                        msgSpan.textContent = '✗ ' + _('Save failed') + ': ' + (res.stderr || _('Unknown error'));
                    }
                }).catch(function (err) {
                    msgSpan.className = 'config-msg err';
                    msgSpan.textContent = '✗ ' + _('Save failed') + ': ' + err.message;
                }).finally(function () {
                    saveBtn.disabled = false;
                    saveBtn.textContent = _('Save & Apply');
                });
            }
        }, _('Save & Apply'));

        return E('div', { 'class': 'cbi-map' }, [
            E('style', [css]),
            E('h2', {}, _('Manual Settings')),
            E('div', { 'class': 'cbi-map-descr' },
                _('Edit config.json directly. After saving, PicoClaw will be automatically restarted.')),
            E('div', { 'class': 'cbi-section' }, [
                E('div', { 'class': 'config-editor-wrap' }, [textarea]),
                E('div', { 'class': 'config-actions' }, [
                    saveBtn,
                    formatBtn,
                    msgSpan
                ]),
                E('div', { 'class': 'config-footer' }, [
                    E('span', { 'class': 'config-path' }, CONFIG_PATH),
                    E('span', {}, [
                        E('a', {
                            'href': 'https://github.com/sipeed/picoclaw/blob/main/README.md',
                            'target': '_blank',
                            'style': 'text-decoration: none;'
                        }, '📖 ' + _('Config Reference'))
                    ])
                ])
            ])
        ]);
    },

    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});
