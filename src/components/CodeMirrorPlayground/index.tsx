import { useMemo } from "react";
import { Checkbox, Divider, Form, Input, Layout, Select } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import type {
  ReactCodeMirrorProps,
  BasicSetupOptions,
} from "@uiw/react-codemirror";
import * as alls from "@uiw/codemirror-themes-all";
import { oneDark } from '@codemirror/theme-one-dark'

const themesAllMap = {
  ...alls,
  dark: oneDark
}

import useCodeMirrorPlayground, {
  langOptions,
  themeOptions,
} from "./useCodeMirrorPlayground";
import "./index.scss";

const { Content, Sider } = Layout;

const basicSetupKeys: (keyof BasicSetupOptions)[] = [
  "lineNumbers",
  "foldGutter",
  "highlightActiveLineGutter",
  "highlightSpecialChars",
  "history",
  "drawSelection",
  "dropCursor",
  "allowMultipleSelections",
  "indentOnInput",
  "syntaxHighlighting",
  "bracketMatching",
  "closeBrackets",
  "autocompletion",
  "rectangularSelection",
  "crosshairCursor",
  "highlightActiveLine",
  "highlightSelectionMatches",
  "closeBracketsKeymap",
  "defaultKeymap",
  "searchKeymap",
  "historyKeymap",
  "foldKeymap",
  "completionKeymap",
  "lintKeymap",
];

const CodeMirrorPlayground = () => {
  const {
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
  } = useCodeMirrorPlayground();

  const BasicSetupItem = useMemo(() => {
    return ({ name }: { name: keyof BasicSetupOptions }) => {
      return (
        <Form.Item
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 8 }}
          key={name}
          label={name}
        >
          <Checkbox
            checked={basicSetup[name] !== false}
            onChange={(e) => {
              handleBasicSetup(name, e.target.checked);
            }}
          />
        </Form.Item>
      );
    };
  }, [basicSetup, handleBasicSetup]);

  return (
    <Layout className="fastx-codemirror-playground-wrapper">
      <Sider className="config-wrapper" width={300}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          size="small"
        >
          <Form.Item label="lang">
            <Select
              options={langOptions}
              value={lang}
              onChange={handleChangeLang}
            />
          </Form.Item>
          <Form.Item label="themes">
            <Select
              options={themeOptions}
              value={theme as string}
              onChange={handleChangeTheme}
            />
          </Form.Item>
          <Form.Item label="placeholder">
            <Input
              value={placeholder}
              onChange={(evn) => setPlaceholder(evn.target.value)}
            />
          </Form.Item>
          <Form.Item label="autoFocus">
            <Checkbox
              checked={autofocus}
              onChange={(e) => {
                setAutofocus(e?.target?.checked);
              }}
            />
          </Form.Item>
          <Form.Item label="editable">
            <Checkbox
              checked={editable}
              onChange={(e) => {
                setEditable(e?.target?.checked);
              }}
            />
          </Form.Item>
          <Divider>basicSetup config</Divider>
          <div className="basic-setup-wrapper">
            {basicSetupKeys?.map((name) => {
              return <BasicSetupItem key={name} name={name} />;
            })}
          </div>
        </Form>
      </Sider>
      <Content className="content-wrapper">
        <CodeMirror
          value={code}
          theme={
            themesAllMap[theme as keyof typeof themesAllMap] as ReactCodeMirrorProps["theme"] 
          }
          editable={editable}
          extensions={extensions}
          autoFocus={autofocus}
          basicSetup={basicSetup}
          placeholder={placeholder}
          onChange={(val) => {
            setCode(val);
          }}
        />
      </Content>
    </Layout>
  );
};

export default CodeMirrorPlayground;
