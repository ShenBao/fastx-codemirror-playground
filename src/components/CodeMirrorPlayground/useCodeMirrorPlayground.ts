import { useCallback, useState } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { color } from "@uiw/codemirror-extensions-color";
import * as alls from "@uiw/codemirror-themes-all";
import type { SelectProps } from "antd";
import type { Extension } from "@codemirror/state";
import type {
  BasicSetupOptions,
  ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { useTheme } from "../../hooks/useTheme";
import langCodeMap from "../../assets/langCodeMap.json";

const formatCamelCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (match) => match.toUpperCase());
};

export const themeOptions = [
  "light",
  //  "dark"
]
  .concat(Object.keys(alls))
  .filter((item) => typeof alls[item as keyof typeof alls] !== "function")
  .filter((item) => !item?.includes("Style"))
  .filter((item) => !/^(defaultSettings)/.test(item as keyof typeof alls))
  .map((it) => {
    return {
      value: it,
      label: formatCamelCase(it),
    };
  });

export const langOptions = Object.keys(langs)
  .sort()
  .map((it) => {
    return {
      value: it,
      label: formatCamelCase(it),
    };
  });

const useCodeMirrorPlayground = () => {
  const [lang, setLang] = useState("javascript");
  const [placeholder, setPlaceholder] = useState("Please enter the code.");
  const [autofocus, setAutofocus] = useState(false);
  const [editable, setEditable] = useState(true);
  const { theme, setTheme } = useTheme();
  const [code, setCode] = useState(langCodeMap.javascript);
  const [extensions, setExtensions] = useState<Extension[]>([
    color,
    langs.javascript(),
  ]);
  const [basicSetup, setBasicSetup] = useState<BasicSetupOptions>({
    crosshairCursor: true,
  });

  const handleChangeLang: SelectProps["onChange"] = (
    lang: keyof typeof langCodeMap
  ) => {
    setLang(lang);
    setCode((langCodeMap[lang] as string) || "");
    if (langs[lang as keyof typeof langs]) {
      setExtensions([color, langs[lang as keyof typeof langs]()]);
    }
  };

  const handleChangeTheme: SelectProps["onChange"] = (value) => {
    document.documentElement.setAttribute(
      "data-color-mode",
      value === "dark" ? "dark" : "light"
    );
    setTheme(value as ReactCodeMirrorProps["theme"]);
  };

  const handleBasicSetup = useCallback(
    (key: string, value: boolean) => {
      setBasicSetup({ ...basicSetup, [key]: value });
    },
    [basicSetup]
  );

  return {
    lang,
    placeholder,
    setPlaceholder,
    autofocus,
    setAutofocus,
    editable,
    setEditable,
    code,
    setCode,
    extensions,
    basicSetup,
    theme,
    handleChangeLang,
    handleChangeTheme,
    handleBasicSetup,
  };
};

export default useCodeMirrorPlayground;
