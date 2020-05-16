const EDITOR_THEME_COOKIE = "bytebeatEditorTheme";

var cmEditor;

const getCookie = name => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

document.getElementById("themeSelect").addEventListener("change", e => {
  let theme = e.target.value;
  document.cookie = EDITOR_THEME_COOKIE + "=" + theme;

  if (!cmEditor) {
    console.error("codemirror not initialised");
    return;
  }

  cmEditor.setOption("theme", theme);
});

document.addEventListener("DOMContentLoaded", () => {
  // a good theme to start with
  let theme = "material-darker";

  // get saved theme if used previously
  let cookieTheme = getCookie(EDITOR_THEME_COOKIE);

  if (cookieTheme) {
    theme = cookieTheme;
    document.getElementById("themeSelect").value = theme;
  }

  cmEditor = CodeMirror(document.getElementById("editorContainer"), {
    value: "function myScript(){return 100;}\n",
    mode: "javascript",
    theme: theme,
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true
  });
});
