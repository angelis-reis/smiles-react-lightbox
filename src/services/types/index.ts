/* eslint-disable no-restricted-globals */

export interface IHeadlessResponse {
  contentFields: [IContentField];
  key?: string;
}

export interface IContentField {
  contentFieldValue: {
    data: string;
  };
  dataType: string;
  label: string;
  name: string;
  nestedContentFields: Array<IContentField>;
  repeatable: boolean;
}
