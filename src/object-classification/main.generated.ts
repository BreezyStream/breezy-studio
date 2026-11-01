/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../graphql/schema.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CollectionOrderInput = {
  field: string;
  order: string;
};

export type CollectionQueryInput = {
  field: string;
  operation?: string | null | undefined;
  value: unknown;
};

export type CreateMyObjectClassificationModelTrainingInput = {
  file: MyObjectClassificationModelTrainingFileInput;
  labels: Array<MyObjectClassificationModelTrainingLabelInput>;
  metrics: MyObjectClassificationModelTrainingMetricsInput;
  objectClassificationModelId: string | number;
};

export type DeleteMyObjectClassificationModelTrainingInput = {
  objectClassificationModelTrainingId: string | number;
};

export type MyObjectClassificationModelAnnotationStatus =
  | 'CONFIRMED'
  | 'SUGGESTED';

export type MyObjectClassificationModelClassMetricsInput = {
  f1?: number | null | undefined;
  precision?: number | null | undefined;
  recall?: number | null | undefined;
  support: number;
};

export type MyObjectClassificationModelFileType =
  | 'TENSORFLOW_JS_MODEL'
  | 'TENSORFLOW_JS_SHARD'
  | 'TENSORFLOW_LITE_FP16_MODEL'
  | 'TENSORFLOW_LITE_FP32_MODEL'
  | 'TENSORFLOW_LITE_INT8_MODEL';

export type MyObjectClassificationModelImageCollectionInput = {
  after: number;
  limit: number;
  objectClassificationModelId: string | number;
  order?: Array<CollectionOrderInput> | null | undefined;
  query?: Array<CollectionQueryInput> | null | undefined;
  search?: string | null | undefined;
};

export type MyObjectClassificationModelLabelCollectionInput = {
  after: number;
  limit: number;
  objectClassificationModelId: string | number;
  order?: Array<CollectionOrderInput> | null | undefined;
  query?: Array<CollectionQueryInput> | null | undefined;
  search?: string | null | undefined;
};

export type MyObjectClassificationModelTrainingFileInput = {
  file: any;
  type: MyObjectClassificationModelFileType;
};

export type MyObjectClassificationModelTrainingLabelInput = {
  metrics: MyObjectClassificationModelClassMetricsInput;
  objectClassificationModelLabelId: string | number;
};

export type MyObjectClassificationModelTrainingMetricsInput = {
  accuracy: number;
  f1: number;
  loss: number;
  prAuc: number;
  precision: number;
  recall: number;
  rocAuc: number;
};

export type ObjectClassificationModelData = { id: string, title: string, infos: string, color: string | null, usage: number, likes: number, labelCount: number, imageCount: number, createdAt: string, updatedAt: string, image: { id: string, url: string } | null, picto: { id: string, url: string } | null, version: { id: string, label: string } | null, latestCompletedTraining: { id: string } | null, latestPublishedTraining: { id: string } | null };

export type ObjectClassificationModelLabelData = { id: string, name: string, title: string, infos: string, color: string, createdAt: string, updatedAt: string, annotationCount: number };

export type ObjectClassificationModelImageData = { id: string, url: string, title: string, infos: string, filename: string, filesize: number, mimetype: string, createdAt: string, updatedAt: string, annotationCount: number, size: { w: number, h: number }, annotations: Array<{ id: string, status: Types.MyObjectClassificationModelAnnotationStatus, createdAt: string, updatedAt: string, label: { id: string, name: string, title: string, infos: string, color: string, createdAt: string, updatedAt: string } }> };

export type ObjectClassificationModelAnnotationData = { id: string, status: Types.MyObjectClassificationModelAnnotationStatus, createdAt: string, updatedAt: string, label: { id: string, name: string, title: string, infos: string, color: string, createdAt: string, updatedAt: string } };

export type DeleteMyObjectClassificationModelTrainingMutationVariables = Exact<{
  input: Types.DeleteMyObjectClassificationModelTrainingInput;
}>;


export type DeleteMyObjectClassificationModelTrainingMutationResult = { deleteMyObjectClassificationModelTraining: boolean };

export type MyObjectClassificationModelLabelCollectionQueryVariables = Exact<{
  input: Types.MyObjectClassificationModelLabelCollectionInput;
}>;


export type MyObjectClassificationModelLabelCollectionQueryResult = { myObjectClassificationModelLabelCollection: { total: number, items: Array<{ id: string, name: string, title: string, infos: string, color: string, createdAt: string, updatedAt: string, annotationCount: number }> } };

export type MyObjectClassificationModelImageCollectionQueryVariables = Exact<{
  input: Types.MyObjectClassificationModelImageCollectionInput;
}>;


export type MyObjectClassificationModelImageCollectionQueryResult = { myObjectClassificationModelImageCollection: { total: number, items: Array<{ id: string, url: string, title: string, infos: string, filename: string, filesize: number, mimetype: string, createdAt: string, updatedAt: string, annotationCount: number, size: { w: number, h: number }, annotations: Array<{ id: string, status: Types.MyObjectClassificationModelAnnotationStatus, createdAt: string, updatedAt: string, label: { id: string, name: string, title: string, infos: string, color: string, createdAt: string, updatedAt: string } }> }> } };

export type CreateMyObjectClassificationModelTrainingVariables = Exact<{
  input: Types.CreateMyObjectClassificationModelTrainingInput;
}>;


export type CreateMyObjectClassificationModelTrainingResult = { createMyObjectClassificationModelTraining: { id: string } };

export const ObjectClassificationModelData = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"usage"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"labelCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestCompletedTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestPublishedTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObjectClassificationModelData, unknown>;
export const ObjectClassificationModelLabelData = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelLabelData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"annotationCount"}}]}}]} as unknown as DocumentNode<ObjectClassificationModelLabelData, unknown>;
export const ObjectClassificationModelAnnotationData = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelAnnotationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelAnnotation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ObjectClassificationModelAnnotationData, unknown>;
export const ObjectClassificationModelImageData = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelImageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"w"}},{"kind":"Field","name":{"kind":"Name","value":"h"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"filesize"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"annotationCount"}},{"kind":"Field","name":{"kind":"Name","value":"annotations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectClassificationModelAnnotationData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelAnnotationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelAnnotation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ObjectClassificationModelImageData, unknown>;
export const DeleteMyObjectClassificationModelTrainingMutation = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMyObjectClassificationModelTrainingMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMyObjectClassificationModelTrainingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMyObjectClassificationModelTraining"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteMyObjectClassificationModelTrainingMutationResult, DeleteMyObjectClassificationModelTrainingMutationVariables>;
export const MyObjectClassificationModelLabelCollectionQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyObjectClassificationModelLabelCollectionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelLabelCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myObjectClassificationModelLabelCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectClassificationModelLabelData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelLabelData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"annotationCount"}}]}}]} as unknown as DocumentNode<MyObjectClassificationModelLabelCollectionQueryResult, MyObjectClassificationModelLabelCollectionQueryVariables>;
export const MyObjectClassificationModelImageCollectionQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyObjectClassificationModelImageCollectionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelImageCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myObjectClassificationModelImageCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectClassificationModelImageData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelAnnotationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelAnnotation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectClassificationModelImageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyObjectClassificationModelImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"w"}},{"kind":"Field","name":{"kind":"Name","value":"h"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"infos"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"filesize"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"annotationCount"}},{"kind":"Field","name":{"kind":"Name","value":"annotations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectClassificationModelAnnotationData"}}]}}]}}]} as unknown as DocumentNode<MyObjectClassificationModelImageCollectionQueryResult, MyObjectClassificationModelImageCollectionQueryVariables>;
export const CreateMyObjectClassificationModelTraining = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMyObjectClassificationModelTraining"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMyObjectClassificationModelTrainingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMyObjectClassificationModelTraining"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMyObjectClassificationModelTrainingResult, CreateMyObjectClassificationModelTrainingVariables>;