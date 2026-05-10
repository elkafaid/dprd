declare module "react-quill" {
  import React from 'react';
  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    placeholder?: string;
    className?: string;
  }
  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
