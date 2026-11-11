export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Mixed: { input: unknown; output: unknown; }
  Object: { input: Record<string, unknown>; output: Record<string, unknown>; }
  Seed: { input: string; output: string; }
  Timestamp: { input: number | string; output: string; }
  Upload: { input: any; output: never; }
};

export type AcceptMyModelInvitationInput = {
  modelInvitationId: Scalars['ID']['input'];
};

export type AcceptMyWidgetInvitationInput = {
  widgetInvitationId: Scalars['ID']['input'];
};

export type AppRelease = {
  __typename?: 'AppRelease';
  arch: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  platform: Scalars['String']['output'];
  product: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type AppReleaseList = {
  __typename?: 'AppReleaseList';
  items: Array<AppRelease>;
  total: Scalars['Int']['output'];
};

export type AssistantAction = {
  __typename?: 'AssistantAction';
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  input: Scalars['Object']['output'];
  output?: Maybe<Scalars['Object']['output']>;
  tool: Scalars['String']['output'];
};

export type AssistantActionResultEvent = {
  __typename?: 'AssistantActionResultEvent';
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  input: Scalars['Object']['output'];
  output?: Maybe<Scalars['Object']['output']>;
  tool: Scalars['String']['output'];
};

export type AssistantActionStartEvent = {
  __typename?: 'AssistantActionStartEvent';
  id: Scalars['String']['output'];
  input: Scalars['Object']['output'];
  tool: Scalars['String']['output'];
};

export type AssistantCreditPack = {
  __typename?: 'AssistantCreditPack';
  createdAt: Scalars['Timestamp']['output'];
  credits: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type AssistantCreditPackList = {
  __typename?: 'AssistantCreditPackList';
  items: Array<AssistantCreditPack>;
  total: Scalars['Int']['output'];
};

export type AssistantCreditPackListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
};

export type AssistantDeltaEvent = {
  __typename?: 'AssistantDeltaEvent';
  text: Scalars['String']['output'];
};

export type AssistantDoneEvent = {
  __typename?: 'AssistantDoneEvent';
  actions: Array<AssistantAction>;
  content: Scalars['String']['output'];
  limited: Scalars['Boolean']['output'];
  truncated: Scalars['Boolean']['output'];
};

export type AssistantEvent = AssistantActionResultEvent | AssistantActionStartEvent | AssistantDeltaEvent | AssistantDoneEvent | AssistantThinkingEvent;

export type AssistantHistoryEntryInput = {
  content: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type AssistantThinkingEvent = {
  __typename?: 'AssistantThinkingEvent';
  text: Scalars['String']['output'];
};

export type BundleMyWidgetInput = {
  client?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type ClaudeModel = {
  __typename?: 'ClaudeModel';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  primary: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ClaudeModelList = {
  __typename?: 'ClaudeModelList';
  items: Array<ClaudeModel>;
  total: Scalars['Int']['output'];
};

export type ClaudeModelListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
};

export type CollectionOrderInput = {
  field: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

export type CollectionQueryInput = {
  field: Scalars['String']['input'];
  operation?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['Mixed']['input'];
};

export type ConfirmUserEmailInput = {
  token: Scalars['String']['input'];
};

export type ConnectMyClaudeAccountInput = {
  apiKey: Scalars['String']['input'];
};

export type CreateMyMediaInput = {
  file: Scalars['Upload']['input'];
};

export type CreateMyMediasInput = {
  items: Array<CreateMyMediaInput>;
};

export type CreateMyModelInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  glyph?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  infos: Scalars['String']['input'];
  pictoId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateMyObjectClassificationModelAnnotationEntryInput = {
  objectClassificationModelLabelId: Scalars['ID']['input'];
  status?: InputMaybe<MyObjectClassificationModelAnnotationStatus>;
};

export type CreateMyObjectClassificationModelImageEntryInput = {
  annotations?: InputMaybe<Array<CreateMyObjectClassificationModelAnnotationEntryInput>>;
  file: Scalars['Upload']['input'];
  infos?: InputMaybe<Scalars['String']['input']>;
  objectClassificationModelId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMyObjectClassificationModelImagesInput = {
  items: Array<CreateMyObjectClassificationModelImageEntryInput>;
};

export type CreateMyObjectClassificationModelLabelInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreateMyObjectClassificationModelTrainingInput = {
  file: MyObjectClassificationModelTrainingFileInput;
  labels: Array<MyObjectClassificationModelTrainingLabelInput>;
  metrics: MyObjectClassificationModelTrainingMetricsInput;
  objectClassificationModelId: Scalars['ID']['input'];
};

export type CreateMyObjectClassificationModelVersionInput = {
  major: Scalars['Int']['input'];
  minor: Scalars['Int']['input'];
  notes: Scalars['String']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  objectClassificationModelTrainingId: Scalars['ID']['input'];
  patch: Scalars['Int']['input'];
};

export type CreateMyOverlayInput = {
  infos?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<CreateMyOverlaySizeInput>;
  theme?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateMyOverlaySizeInput = {
  h: Scalars['Int']['input'];
  w: Scalars['Int']['input'];
};

export type CreateMyOwnWidgetSizeInput = {
  h: Scalars['Int']['input'];
  w: Scalars['Int']['input'];
};

export type CreateMyTwitchAccessTokenInput = {
  state: Scalars['String']['input'];
};

export type CreateMyWidgetFieldInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  state?: InputMaybe<Scalars['Object']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  value?: InputMaybe<Scalars['Object']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type CreateMyWidgetInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  externals?: InputMaybe<Array<MyWidgetExternalInput>>;
  gameIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  glyph?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  infos: Scalars['String']['input'];
  language: Scalars['String']['input'];
  pictoId?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<CreateMyOwnWidgetSizeInput>;
  summary?: InputMaybe<Scalars['String']['input']>;
  templateId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type CreateMyWidgetModelInput = {
  modelId: Scalars['ID']['input'];
  widgetId: Scalars['ID']['input'];
};

export type CreateMyWidgetResourceInput = {
  client?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  type: Scalars['String']['input'];
  widgetId: Scalars['ID']['input'];
};

export type CreateMyWidgetVersionInput = {
  major: Scalars['Int']['input'];
  minor: Scalars['Int']['input'];
  notes: Scalars['String']['input'];
  patch: Scalars['Int']['input'];
  widgetId: Scalars['ID']['input'];
};

export type DeclineMyModelInvitationInput = {
  modelInvitationId: Scalars['ID']['input'];
};

export type DeclineMyWidgetInvitationInput = {
  widgetInvitationId: Scalars['ID']['input'];
};

export type DeleteMyMediaInput = {
  mediaId: Scalars['ID']['input'];
};

export type DeleteMyModelMemberInput = {
  modelMemberId: Scalars['ID']['input'];
};

export type DeleteMyObjectClassificationModelImageEntryInput = {
  objectClassificationModelImageId: Scalars['ID']['input'];
};

export type DeleteMyObjectClassificationModelImagesInput = {
  items: Array<DeleteMyObjectClassificationModelImageEntryInput>;
};

export type DeleteMyObjectClassificationModelInput = {
  objectClassificationModelId: Scalars['ID']['input'];
};

export type DeleteMyObjectClassificationModelLabelInput = {
  objectClassificationModelLabelId: Scalars['ID']['input'];
};

export type DeleteMyObjectClassificationModelTrainingInput = {
  objectClassificationModelTrainingId: Scalars['ID']['input'];
};

export type DeleteMyObjectClassificationModelVersionInput = {
  objectClassificationModelVersionId: Scalars['ID']['input'];
};

export type DeleteMyOverlayInput = {
  overlayId: Scalars['ID']['input'];
};

export type DeleteMyWidgetFieldInput = {
  widgetFieldId: Scalars['ID']['input'];
};

export type DeleteMyWidgetInput = {
  widgetId: Scalars['ID']['input'];
};

export type DeleteMyWidgetMemberInput = {
  widgetMemberId: Scalars['ID']['input'];
};

export type DeleteMyWidgetModelInput = {
  widgetModelId: Scalars['ID']['input'];
};

export type DeleteMyWidgetResourceInput = {
  client?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['Int']['input']>;
  widgetResourceId: Scalars['ID']['input'];
};

export type DeleteMyWidgetVersionInput = {
  widgetVersionId: Scalars['ID']['input'];
};

export type Frame = {
  __typename?: 'Frame';
  h: Scalars['Float']['output'];
  w: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type FrameInput = {
  __typename?: 'FrameInput';
  h: Scalars['Float']['output'];
  w: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type Game = {
  __typename?: 'Game';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  infos: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type GameCollection = {
  __typename?: 'GameCollection';
  after: Scalars['Int']['output'];
  items: Array<Game>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GameCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GameInput = {
  gameId: Scalars['ID']['input'];
};

export type GameSelection = {
  __typename?: 'GameSelection';
  items: Array<Maybe<Game>>;
  total: Scalars['Int']['output'];
};

export type GameSelectionInput = {
  selection: Array<Scalars['ID']['input']>;
};

export type InsertMyOverlayWidgetInput = {
  overlayId: Scalars['ID']['input'];
  widgetId: Scalars['ID']['input'];
  widgetVersionId?: InputMaybe<Scalars['ID']['input']>;
};

export type InviteMyModelMemberInput = {
  modelId: Scalars['ID']['input'];
  recipient: Scalars['String']['input'];
  role: ModelMemberRole;
};

export type InviteMyWidgetMemberInput = {
  recipient: Scalars['String']['input'];
  role: WidgetMemberRole;
  widgetId: Scalars['ID']['input'];
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  current: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  primary: Scalars['Boolean']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type LanguageInput = {
  languageId: Scalars['ID']['input'];
};

export type LanguageList = {
  __typename?: 'LanguageList';
  items: Array<Language>;
  total: Scalars['Int']['output'];
};

export type LanguageListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
};

export type LatestAppReleaseListInput = {
  product?: InputMaybe<Scalars['String']['input']>;
};

export type LeaveMyModelInput = {
  modelId: Scalars['ID']['input'];
};

export type LeaveMyWidgetInput = {
  widgetId: Scalars['ID']['input'];
};

export type ListOrderInput = {
  field: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

export type ListQueryInput = {
  field: Scalars['String']['input'];
  operation?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['Mixed']['input'];
};

export enum LockReason {
  PlanQuota = 'PLAN_QUOTA'
}

export enum MlInputColor {
  Bgr = 'BGR',
  Rgb = 'RGB'
}

export type MlInputRange = {
  __typename?: 'MLInputRange';
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

export type MlInputShape = {
  __typename?: 'MLInputShape';
  c: Scalars['Int']['output'];
  h: Scalars['Int']['output'];
  w: Scalars['Int']['output'];
};

export enum MlInputType {
  Float16 = 'FLOAT16',
  Float32 = 'FLOAT32',
  Float64 = 'FLOAT64',
  Int8 = 'INT8',
  Int32 = 'INT32',
  Int64 = 'INT64',
  Uint8 = 'UINT8',
  Uint32 = 'UINT32',
  Uint64 = 'UINT64'
}

export type Media = {
  __typename?: 'Media';
  attributes: Array<MediaAttribute>;
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  thumbnail: MediaThumbnail;
  thumbnails: Array<MediaThumbnail>;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export type MediaAttribute = {
  __typename?: 'MediaAttribute';
  createdAt: Scalars['Timestamp']['output'];
  data: Scalars['Object']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MediaInput = {
  mediaId: Scalars['ID']['input'];
};

export type MediaThumbnail = {
  __typename?: 'MediaThumbnail';
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  size: Size;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export type MediasInput = {
  mediaIds: Array<Scalars['ID']['input']>;
};

export type Model = ObjectClassificationModel | ObjectDetectionModel;

export enum ModelAccessRole {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  User = 'USER',
  Viewer = 'VIEWER'
}

export enum ModelAccessScope {
  All = 'ALL',
  Owned = 'OWNED',
  Shared = 'SHARED'
}

export type ModelCategory = {
  __typename?: 'ModelCategory';
  count: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  picto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ModelCategoryInput = {
  modelCategoryId: Scalars['ID']['input'];
};

export type ModelCategoryList = {
  __typename?: 'ModelCategoryList';
  after: Scalars['Int']['output'];
  items: Array<ModelCategory>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ModelCategoryListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ModelCollection = {
  __typename?: 'ModelCollection';
  after: Scalars['Int']['output'];
  items: Array<ModelResult>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ModelCollectionByCategory = {
  __typename?: 'ModelCollectionByCategory';
  after: Scalars['Int']['output'];
  items: Array<ModelCollectionByCategoryItem>;
  limit: Scalars['Int']['output'];
  query?: Maybe<Scalars['Object']['output']>;
  total: Scalars['Int']['output'];
};

export type ModelCollectionByCategoryInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
};

export type ModelCollectionByCategoryItem = {
  __typename?: 'ModelCollectionByCategoryItem';
  after: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  items: Array<ModelResult>;
  limit: Scalars['Int']['output'];
  picto: Scalars['String']['output'];
  query?: Maybe<Scalars['Object']['output']>;
  title: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type ModelCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ModelInput = {
  modelId: Scalars['ID']['input'];
};

export enum ModelMemberRole {
  Editor = 'EDITOR',
  User = 'USER',
  Viewer = 'VIEWER'
}

export enum ModelMemberStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type ModelResult = MyObjectClassificationModel | MyObjectDetectionModel | ObjectClassificationModel | ObjectDetectionModel;

export type ModelSnapshot = ObjectClassificationModelSnapshot | ObjectDetectionModelSnapshot;

export enum ModelType {
  ObjectClassification = 'OBJECT_CLASSIFICATION',
  ObjectDetection = 'OBJECT_DETECTION'
}

export type ModelVersion = ObjectClassificationModelVersion | ObjectDetectionModelVersion;

export enum ModelVersionAccess {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type MoveMyWidgetFieldInput = {
  position: MoveMyWidgetFieldPosition;
  sourceWidgetFieldId: Scalars['ID']['input'];
  targetWidgetFieldId: Scalars['ID']['input'];
};

export enum MoveMyWidgetFieldPosition {
  After = 'AFTER',
  Before = 'BEFORE'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptMyModelInvitation: MyModel;
  acceptMyWidgetInvitation: MyWidget;
  bundleMyWidget: MyWidget;
  cancelMyUserEmailUpdate: Scalars['Boolean']['output'];
  confirmUserEmail: Scalars['Boolean']['output'];
  connectMyClaudeAccount: MyClaudeAccount;
  createMyMedia: MyMedia;
  createMyMedias: Array<MyMedia>;
  createMyModel: MyModel;
  createMyObjectClassificationModelImages: Array<MyObjectClassificationModelImage>;
  createMyObjectClassificationModelLabel: MyObjectClassificationModelLabel;
  createMyObjectClassificationModelTraining: MyObjectClassificationModelTraining;
  createMyObjectClassificationModelVersion: MyObjectClassificationModelVersion;
  createMyOverlay: MyOverlay;
  createMyTwitchAccessToken: MyTwitchAccessToken;
  createMyWidget: MyWidget;
  createMyWidgetField: MyWidgetField;
  createMyWidgetModel: MyWidgetModel;
  createMyWidgetResource: MyWidgetResource;
  createMyWidgetVersion: MyWidgetVersion;
  declineMyModelInvitation: Scalars['Boolean']['output'];
  declineMyWidgetInvitation: Scalars['Boolean']['output'];
  deleteMyMedia: Scalars['Boolean']['output'];
  deleteMyModelMember: Scalars['Boolean']['output'];
  deleteMyObjectClassificationModel: Scalars['Boolean']['output'];
  deleteMyObjectClassificationModelImages: Scalars['Boolean']['output'];
  deleteMyObjectClassificationModelLabel: Scalars['Boolean']['output'];
  deleteMyObjectClassificationModelTraining: Scalars['Boolean']['output'];
  deleteMyObjectClassificationModelVersion: Scalars['Boolean']['output'];
  deleteMyOverlay: Scalars['Boolean']['output'];
  deleteMyWidget: Scalars['Boolean']['output'];
  deleteMyWidgetField: Scalars['Boolean']['output'];
  deleteMyWidgetMember: Scalars['Boolean']['output'];
  deleteMyWidgetModel: Scalars['Boolean']['output'];
  deleteMyWidgetResource: Scalars['Boolean']['output'];
  deleteMyWidgetVersion: Scalars['Boolean']['output'];
  disconnectMyClaudeAccount: Scalars['Boolean']['output'];
  insertMyOverlayWidget: MyOverlayWidget;
  inviteMyModelMember: MyModelMember;
  inviteMyWidgetMember: MyWidgetMember;
  leaveMyModel: Scalars['Boolean']['output'];
  leaveMyWidget: Scalars['Boolean']['output'];
  moveMyWidgetField: Array<MyWidgetField>;
  recoverUserPassword: Scalars['Boolean']['output'];
  refreshMyTwitchAccessToken?: Maybe<MyTwitchAccessToken>;
  refreshOverlayTwitchAccessToken?: Maybe<MyTwitchAccessToken>;
  regenerateMyOverlayToken: MyOverlay;
  removeMyOverlayWidget: Scalars['Boolean']['output'];
  resetUserPassword: Scalars['Boolean']['output'];
  revokeMyTwitchAccessToken?: Maybe<MyTwitchAccessToken>;
  selectMyOverlayWidgetVersion: MyOverlayWidget;
  selectMyWidgetModelVersion: MyWidgetModel;
  signInUser: Session;
  signInUserWithProvider: Session;
  signOutUser: Scalars['Boolean']['output'];
  signUpUser: Scalars['Boolean']['output'];
  toggleModelLike: Model;
  toggleWidgetLike: Widget;
  updateMyAssistantSettings: MyAssistantSettings;
  updateMyMedia: MyMedia;
  updateMyModelMember: MyModelMember;
  updateMyObjectClassificationModel: MyObjectClassificationModel;
  updateMyObjectClassificationModelImages: Array<MyObjectClassificationModelImage>;
  updateMyObjectClassificationModelLabel: MyObjectClassificationModelLabel;
  updateMyObjectClassificationModelVersion: MyObjectClassificationModelVersion;
  updateMyOverlay: MyOverlay;
  updateMyOverlayWidget: MyOverlayWidget;
  updateMyUser: MyUser;
  updateMyUserEmail: Scalars['Boolean']['output'];
  updateMyUserPassword: MyUser;
  updateMyUserPhone: MyUser;
  updateMyWidget: MyWidget;
  updateMyWidgetField: MyWidgetField;
  updateMyWidgetMember: MyWidgetMember;
  updateMyWidgetResource: MyWidgetResource;
  updateMyWidgetResources: Array<MyWidgetResource>;
  updateMyWidgetVersion: MyWidgetVersion;
  verifyUser: Scalars['Boolean']['output'];
};


export type MutationAcceptMyModelInvitationArgs = {
  input: AcceptMyModelInvitationInput;
};


export type MutationAcceptMyWidgetInvitationArgs = {
  input: AcceptMyWidgetInvitationInput;
};


export type MutationBundleMyWidgetArgs = {
  input: BundleMyWidgetInput;
};


export type MutationConfirmUserEmailArgs = {
  input: ConfirmUserEmailInput;
};


export type MutationConnectMyClaudeAccountArgs = {
  input: ConnectMyClaudeAccountInput;
};


export type MutationCreateMyMediaArgs = {
  input: CreateMyMediaInput;
};


export type MutationCreateMyMediasArgs = {
  input: CreateMyMediasInput;
};


export type MutationCreateMyModelArgs = {
  input: CreateMyModelInput;
};


export type MutationCreateMyObjectClassificationModelImagesArgs = {
  input: CreateMyObjectClassificationModelImagesInput;
};


export type MutationCreateMyObjectClassificationModelLabelArgs = {
  input: CreateMyObjectClassificationModelLabelInput;
};


export type MutationCreateMyObjectClassificationModelTrainingArgs = {
  input: CreateMyObjectClassificationModelTrainingInput;
};


export type MutationCreateMyObjectClassificationModelVersionArgs = {
  input: CreateMyObjectClassificationModelVersionInput;
};


export type MutationCreateMyOverlayArgs = {
  input: CreateMyOverlayInput;
};


export type MutationCreateMyTwitchAccessTokenArgs = {
  input: CreateMyTwitchAccessTokenInput;
};


export type MutationCreateMyWidgetArgs = {
  input: CreateMyWidgetInput;
};


export type MutationCreateMyWidgetFieldArgs = {
  input: CreateMyWidgetFieldInput;
};


export type MutationCreateMyWidgetModelArgs = {
  input: CreateMyWidgetModelInput;
};


export type MutationCreateMyWidgetResourceArgs = {
  input: CreateMyWidgetResourceInput;
};


export type MutationCreateMyWidgetVersionArgs = {
  input: CreateMyWidgetVersionInput;
};


export type MutationDeclineMyModelInvitationArgs = {
  input: DeclineMyModelInvitationInput;
};


export type MutationDeclineMyWidgetInvitationArgs = {
  input: DeclineMyWidgetInvitationInput;
};


export type MutationDeleteMyMediaArgs = {
  input: DeleteMyMediaInput;
};


export type MutationDeleteMyModelMemberArgs = {
  input: DeleteMyModelMemberInput;
};


export type MutationDeleteMyObjectClassificationModelArgs = {
  input: DeleteMyObjectClassificationModelInput;
};


export type MutationDeleteMyObjectClassificationModelImagesArgs = {
  input: DeleteMyObjectClassificationModelImagesInput;
};


export type MutationDeleteMyObjectClassificationModelLabelArgs = {
  input: DeleteMyObjectClassificationModelLabelInput;
};


export type MutationDeleteMyObjectClassificationModelTrainingArgs = {
  input: DeleteMyObjectClassificationModelTrainingInput;
};


export type MutationDeleteMyObjectClassificationModelVersionArgs = {
  input: DeleteMyObjectClassificationModelVersionInput;
};


export type MutationDeleteMyOverlayArgs = {
  input: DeleteMyOverlayInput;
};


export type MutationDeleteMyWidgetArgs = {
  input: DeleteMyWidgetInput;
};


export type MutationDeleteMyWidgetFieldArgs = {
  input: DeleteMyWidgetFieldInput;
};


export type MutationDeleteMyWidgetMemberArgs = {
  input: DeleteMyWidgetMemberInput;
};


export type MutationDeleteMyWidgetModelArgs = {
  input: DeleteMyWidgetModelInput;
};


export type MutationDeleteMyWidgetResourceArgs = {
  input: DeleteMyWidgetResourceInput;
};


export type MutationDeleteMyWidgetVersionArgs = {
  input: DeleteMyWidgetVersionInput;
};


export type MutationInsertMyOverlayWidgetArgs = {
  input: InsertMyOverlayWidgetInput;
};


export type MutationInviteMyModelMemberArgs = {
  input: InviteMyModelMemberInput;
};


export type MutationInviteMyWidgetMemberArgs = {
  input: InviteMyWidgetMemberInput;
};


export type MutationLeaveMyModelArgs = {
  input: LeaveMyModelInput;
};


export type MutationLeaveMyWidgetArgs = {
  input: LeaveMyWidgetInput;
};


export type MutationMoveMyWidgetFieldArgs = {
  input: MoveMyWidgetFieldInput;
};


export type MutationRecoverUserPasswordArgs = {
  input: RecoverUserPasswordInput;
};


export type MutationRefreshMyTwitchAccessTokenArgs = {
  input: RefreshMyTwitchAccessTokenInput;
};


export type MutationRefreshOverlayTwitchAccessTokenArgs = {
  input: RefreshOverlayTwitchAccessTokenInput;
};


export type MutationRegenerateMyOverlayTokenArgs = {
  input: RegenerateMyOverlayTokenInput;
};


export type MutationRemoveMyOverlayWidgetArgs = {
  input: RemoveMyOverlayWidgetInput;
};


export type MutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput;
};


export type MutationRevokeMyTwitchAccessTokenArgs = {
  input: RevokeMyTwitchAccessTokenInput;
};


export type MutationSelectMyOverlayWidgetVersionArgs = {
  input: SelectMyOverlayWidgetVersionInput;
};


export type MutationSelectMyWidgetModelVersionArgs = {
  input: SelectMyWidgetModelVersionInput;
};


export type MutationSignInUserArgs = {
  input: SignInUserInput;
};


export type MutationSignInUserWithProviderArgs = {
  input: SignInUserWithProviderInput;
};


export type MutationSignUpUserArgs = {
  input: SignUpUserInput;
};


export type MutationToggleModelLikeArgs = {
  input: ToggleModelLikeInput;
};


export type MutationToggleWidgetLikeArgs = {
  input: ToggleWidgetLikeInput;
};


export type MutationUpdateMyAssistantSettingsArgs = {
  input: UpdateMyAssistantSettingsInput;
};


export type MutationUpdateMyMediaArgs = {
  input: UpdateMyMediaInput;
};


export type MutationUpdateMyModelMemberArgs = {
  input: UpdateMyModelMemberInput;
};


export type MutationUpdateMyObjectClassificationModelArgs = {
  input: UpdateMyObjectClassificationModelInput;
};


export type MutationUpdateMyObjectClassificationModelImagesArgs = {
  input: UpdateMyObjectClassificationModelImagesInput;
};


export type MutationUpdateMyObjectClassificationModelLabelArgs = {
  input: UpdateMyObjectClassificationModelLabelInput;
};


export type MutationUpdateMyObjectClassificationModelVersionArgs = {
  input: UpdateMyObjectClassificationModelVersionInput;
};


export type MutationUpdateMyOverlayArgs = {
  input: UpdateMyOverlayInput;
};


export type MutationUpdateMyOverlayWidgetArgs = {
  input: UpdateMyOverlayWidgetInput;
};


export type MutationUpdateMyUserArgs = {
  input: UpdateMyUserInput;
};


export type MutationUpdateMyUserEmailArgs = {
  input: UpdateMyUserEmailInput;
};


export type MutationUpdateMyUserPasswordArgs = {
  input: UpdateMyUserPasswordInput;
};


export type MutationUpdateMyUserPhoneArgs = {
  input: UpdateMyUserPhoneInput;
};


export type MutationUpdateMyWidgetArgs = {
  input: UpdateMyWidgetInput;
};


export type MutationUpdateMyWidgetFieldArgs = {
  input: UpdateMyWidgetFieldInput;
};


export type MutationUpdateMyWidgetMemberArgs = {
  input: UpdateMyWidgetMemberInput;
};


export type MutationUpdateMyWidgetResourceArgs = {
  input: UpdateMyWidgetResourceInput;
};


export type MutationUpdateMyWidgetResourcesArgs = {
  input: UpdateMyWidgetResourcesInput;
};


export type MutationUpdateMyWidgetVersionArgs = {
  input: UpdateMyWidgetVersionInput;
};


export type MutationVerifyUserArgs = {
  input?: InputMaybe<VerifyUserInput>;
};

export type MyAssistantSettings = {
  __typename?: 'MyAssistantSettings';
  effort: Scalars['String']['output'];
  model?: Maybe<ClaudeModel>;
};

export type MyClaudeAccount = {
  __typename?: 'MyClaudeAccount';
  apiKeyPreview: Scalars['String']['output'];
  connectedAt: Scalars['Timestamp']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyMedia = {
  __typename?: 'MyMedia';
  attributes: Array<MyMediaAttribute>;
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  locked: Scalars['Boolean']['output'];
  mimetype: Scalars['String']['output'];
  name: Scalars['String']['output'];
  thumbnail: MyMediaThumbnail;
  thumbnails: Array<MyMediaThumbnail>;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export type MyMediaAttribute = {
  __typename?: 'MyMediaAttribute';
  createdAt: Scalars['Timestamp']['output'];
  data: Scalars['Object']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyMediaCollection = {
  __typename?: 'MyMediaCollection';
  after: Scalars['Int']['output'];
  items: Array<MyMedia>;
  limit: Scalars['Int']['output'];
  query?: Maybe<Scalars['Object']['output']>;
  total: Scalars['Int']['output'];
};

export type MyMediaCollectionInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
};

export type MyMediaInput = {
  mediaId: Scalars['ID']['input'];
};

export type MyMediaThumbnail = {
  __typename?: 'MyMediaThumbnail';
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  size: Size;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export type MyModel = MyObjectClassificationModel | MyObjectDetectionModel;

export type MyModelCollection = {
  __typename?: 'MyModelCollection';
  after: Scalars['Int']['output'];
  items: Array<MyModel>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyModelCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  scope?: InputMaybe<ModelAccessScope>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyModelInput = {
  modelId: Scalars['ID']['input'];
};

export type MyModelInvitation = {
  __typename?: 'MyModelInvitation';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  invitedBy?: Maybe<User>;
  model: Model;
  role: ModelMemberRole;
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyModelInvitationList = {
  __typename?: 'MyModelInvitationList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyModelInvitation>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyModelInvitationListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyModelMember = {
  __typename?: 'MyModelMember';
  createdAt: Scalars['Timestamp']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invitedBy?: Maybe<User>;
  role: ModelMemberRole;
  status: ModelMemberStatus;
  updatedAt: Scalars['Timestamp']['output'];
  user?: Maybe<User>;
};

export type MyModelMemberListInput = {
  modelId: Scalars['ID']['input'];
};

export enum MyModelType {
  ObjectClassification = 'OBJECT_CLASSIFICATION',
  ObjectDetection = 'OBJECT_DETECTION'
}

export type MyObjectClassificationModel = {
  __typename?: 'MyObjectClassificationModel';
  annotationCount: Scalars['Int']['output'];
  category?: Maybe<ModelCategory>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  games: Array<Game>;
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  imageCount: Scalars['Int']['output'];
  inferenceRate: Scalars['Float']['output'];
  infos: Scalars['String']['output'];
  inputColor: MlInputColor;
  inputRange: MlInputRange;
  inputShape: MlInputShape;
  inputType: Scalars['String']['output'];
  labelCount: Scalars['Int']['output'];
  latestCompletedTraining?: Maybe<MyObjectClassificationModelTraining>;
  latestPublishedTraining?: Maybe<MyObjectClassificationModelTraining>;
  liked: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  locked?: Maybe<LockReason>;
  picto?: Maybe<Media>;
  role: ModelAccessRole;
  stability: Scalars['Float']['output'];
  stats: MyObjectClassificationModelStats;
  summary: Scalars['String']['output'];
  threshold: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
  version?: Maybe<MyObjectClassificationModelVersion>;
};

export type MyObjectClassificationModelAnnotation = {
  __typename?: 'MyObjectClassificationModelAnnotation';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  label: MyObjectClassificationModelLabel;
  status: MyObjectClassificationModelAnnotationStatus;
  updatedAt: Scalars['Timestamp']['output'];
};

export enum MyObjectClassificationModelAnnotationStatus {
  Confirmed = 'CONFIRMED',
  Suggested = 'SUGGESTED'
}

export type MyObjectClassificationModelClass = {
  __typename?: 'MyObjectClassificationModelClass';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<MyObjectClassificationModelLabel>;
  metrics: MyObjectClassificationModelClassMetrics;
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MyObjectClassificationModelClassMetrics = {
  __typename?: 'MyObjectClassificationModelClassMetrics';
  f1?: Maybe<Scalars['Float']['output']>;
  precision?: Maybe<Scalars['Float']['output']>;
  recall?: Maybe<Scalars['Float']['output']>;
  support: Scalars['Int']['output'];
};

export type MyObjectClassificationModelClassMetricsInput = {
  f1?: InputMaybe<Scalars['Float']['input']>;
  precision?: InputMaybe<Scalars['Float']['input']>;
  recall?: InputMaybe<Scalars['Float']['input']>;
  support: Scalars['Int']['input'];
};

export type MyObjectClassificationModelFile = {
  __typename?: 'MyObjectClassificationModelFile';
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  type: MyObjectClassificationModelFileType;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export enum MyObjectClassificationModelFileType {
  OnnxFp16Model = 'ONNX_FP16_MODEL',
  OnnxFp32Model = 'ONNX_FP32_MODEL',
  OnnxInt8Model = 'ONNX_INT8_MODEL',
  TensorflowJsModel = 'TENSORFLOW_JS_MODEL',
  TensorflowJsShard = 'TENSORFLOW_JS_SHARD',
  TensorflowLiteFp16Model = 'TENSORFLOW_LITE_FP16_MODEL',
  TensorflowLiteFp32Model = 'TENSORFLOW_LITE_FP32_MODEL',
  TensorflowLiteInt8Model = 'TENSORFLOW_LITE_INT8_MODEL'
}

export type MyObjectClassificationModelImage = {
  __typename?: 'MyObjectClassificationModelImage';
  annotationCount: Scalars['Int']['output'];
  annotations: Array<MyObjectClassificationModelAnnotation>;
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
  size: Size;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export type MyObjectClassificationModelImageCollection = {
  __typename?: 'MyObjectClassificationModelImageCollection';
  after: Scalars['Int']['output'];
  items: Array<MyObjectClassificationModelImage>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelImageCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyObjectClassificationModelImageInput = {
  objectClassificationModelImageId: Scalars['ID']['input'];
};

export type MyObjectClassificationModelInput = {
  objectClassificationModelId: Scalars['ID']['input'];
};

export type MyObjectClassificationModelLabel = {
  __typename?: 'MyObjectClassificationModelLabel';
  annotationCount: Scalars['Int']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyObjectClassificationModelLabelCollection = {
  __typename?: 'MyObjectClassificationModelLabelCollection';
  after: Scalars['Int']['output'];
  items: Array<MyObjectClassificationModelLabel>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelLabelCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyObjectClassificationModelLabelInput = {
  objectClassificationModelLabelId: Scalars['ID']['input'];
};

export type MyObjectClassificationModelLabelList = {
  __typename?: 'MyObjectClassificationModelLabelList';
  after: Scalars['Int']['output'];
  items: Array<MyObjectClassificationModelLabel>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelLabelListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyObjectClassificationModelLabelSelection = {
  __typename?: 'MyObjectClassificationModelLabelSelection';
  items: Array<Maybe<MyObjectClassificationModelLabel>>;
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelLabelSelectionInput = {
  selection: Array<Scalars['ID']['input']>;
};

export type MyObjectClassificationModelLikesStats = {
  __typename?: 'MyObjectClassificationModelLikesStats';
  history: StatsHistory;
  me: Scalars['Int']['output'];
  others: Scalars['Int']['output'];
};

export type MyObjectClassificationModelStats = {
  __typename?: 'MyObjectClassificationModelStats';
  likes: MyObjectClassificationModelLikesStats;
  usage: MyObjectClassificationModelUsageStats;
};

export type MyObjectClassificationModelTraining = {
  __typename?: 'MyObjectClassificationModelTraining';
  annotationCount: Scalars['Int']['output'];
  classes: Array<MyObjectClassificationModelClass>;
  createdAt: Scalars['Timestamp']['output'];
  files: Array<MyObjectClassificationModelFile>;
  id: Scalars['ID']['output'];
  imageCount: Scalars['Int']['output'];
  labelCount: Scalars['Int']['output'];
  metrics: MyObjectClassificationModelTrainingMetrics;
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyObjectClassificationModelTrainingCollection = {
  __typename?: 'MyObjectClassificationModelTrainingCollection';
  after: Scalars['Int']['output'];
  items: Array<MyObjectClassificationModelTraining>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelTrainingCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyObjectClassificationModelTrainingFileInput = {
  file: Scalars['Upload']['input'];
  type: MyObjectClassificationModelFileType;
};

export type MyObjectClassificationModelTrainingInput = {
  objectClassificationModelTrainingId: Scalars['ID']['input'];
};

export type MyObjectClassificationModelTrainingLabelInput = {
  metrics: MyObjectClassificationModelClassMetricsInput;
  objectClassificationModelLabelId: Scalars['ID']['input'];
};

export type MyObjectClassificationModelTrainingList = {
  __typename?: 'MyObjectClassificationModelTrainingList';
  after: Scalars['Int']['output'];
  items: Array<MyObjectClassificationModelTraining>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelTrainingListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
};

export type MyObjectClassificationModelTrainingMetrics = {
  __typename?: 'MyObjectClassificationModelTrainingMetrics';
  accuracy: Scalars['Float']['output'];
  f1: Scalars['Float']['output'];
  loss: Scalars['Float']['output'];
  prAuc: Scalars['Float']['output'];
  precision: Scalars['Float']['output'];
  recall: Scalars['Float']['output'];
  rocAuc: Scalars['Float']['output'];
};

export type MyObjectClassificationModelTrainingMetricsInput = {
  accuracy: Scalars['Float']['input'];
  f1: Scalars['Float']['input'];
  loss: Scalars['Float']['input'];
  prAuc: Scalars['Float']['input'];
  precision: Scalars['Float']['input'];
  recall: Scalars['Float']['input'];
  rocAuc: Scalars['Float']['input'];
};

export type MyObjectClassificationModelUsageStats = {
  __typename?: 'MyObjectClassificationModelUsageStats';
  history: StatsHistory;
  me: Scalars['Int']['output'];
  others: Scalars['Int']['output'];
};

export type MyObjectClassificationModelVersion = {
  __typename?: 'MyObjectClassificationModelVersion';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  listed: Scalars['Boolean']['output'];
  major: Scalars['Int']['output'];
  minor: Scalars['Int']['output'];
  notes: Scalars['String']['output'];
  patch: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyObjectClassificationModelVersionCollection = {
  __typename?: 'MyObjectClassificationModelVersionCollection';
  after: Scalars['Int']['output'];
  items: Array<MyObjectClassificationModelVersion>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyObjectClassificationModelVersionCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyObjectClassificationModelVersionInput = {
  objectClassificationModelVersionId: Scalars['ID']['input'];
};

export type MyObjectDetectionModel = {
  __typename?: 'MyObjectDetectionModel';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  picto?: Maybe<Media>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
};

export type MyOverlay = {
  __typename?: 'MyOverlay';
  createdAt: Scalars['Timestamp']['output'];
  fetchedAt?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  picto?: Maybe<Media>;
  size: Size;
  theme: Scalars['String']['output'];
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  widgets: Array<MyOverlayWidget>;
};

export type MyOverlayCollection = {
  __typename?: 'MyOverlayCollection';
  after: Scalars['Int']['output'];
  items: Array<MyOverlay>;
  limit: Scalars['Int']['output'];
  query?: Maybe<Scalars['Object']['output']>;
  total: Scalars['Int']['output'];
};

export type MyOverlayCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyOverlayInput = {
  overlayId: Scalars['ID']['input'];
};

export type MyOverlayWidget = {
  __typename?: 'MyOverlayWidget';
  active: Scalars['Boolean']['output'];
  anchor: Point;
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  display: OverlayWidgetDisplay;
  hidden: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos?: Maybe<Scalars['String']['output']>;
  locked: Scalars['Boolean']['output'];
  origin: Point;
  size: Size;
  snapshot: WidgetSnapshot;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
  values: Scalars['Object']['output'];
};

export type MyOverlayWidgetUpdate = {
  __typename?: 'MyOverlayWidgetUpdate';
  deprecated: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  overlay: MyOverlay;
  overlayWidget: MyOverlayWidget;
  version: WidgetVersion;
};

export type MyPlan = {
  __typename?: 'MyPlan';
  createdAt: Scalars['Timestamp']['output'];
  expiresDate?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  prices: Array<PlanPrice>;
  quotas: Array<PlanQuota>;
  startedDate?: Maybe<Scalars['Timestamp']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyTwitchAccessToken = {
  __typename?: 'MyTwitchAccessToken';
  accessToken: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  createdDate: Scalars['Timestamp']['output'];
  expiresDate: Scalars['Timestamp']['output'];
  expiresIn: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  revokedDate?: Maybe<Scalars['Timestamp']['output']>;
  scope?: Maybe<Scalars['Object']['output']>;
  state?: Maybe<Scalars['Object']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
  updatedDate?: Maybe<Scalars['Timestamp']['output']>;
};

export type MyUpdate = MyOverlayWidgetUpdate | MyWidgetModelUpdate;

export type MyUpdateList = {
  __typename?: 'MyUpdateList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyUpdate>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyUpdateListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type MyUser = {
  __typename?: 'MyUser';
  about?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  lastname: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  pendingEmail?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  plan: MyPlan;
  role: Scalars['String']['output'];
  settings: MyUserSettings;
  stats: MyUserStats;
  theme?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: MyUserUsage;
};

export type MyUserAssistantUsage = {
  __typename?: 'MyUserAssistantUsage';
  creditBalance: Scalars['Int']['output'];
  creditQuota: Scalars['Float']['output'];
  creditUsage: Scalars['Float']['output'];
  dailyPlanQuota: Scalars['Float']['output'];
  dailyPlanUsage: Scalars['Float']['output'];
  expiresDate: Scalars['Timestamp']['output'];
  monthlyPlanQuota: Scalars['Float']['output'];
  monthlyPlanUsage: Scalars['Float']['output'];
  startedDate: Scalars['Timestamp']['output'];
  weeklyPlanQuota: Scalars['Float']['output'];
  weeklyPlanUsage: Scalars['Float']['output'];
};

export type MyUserEditorSettings = {
  __typename?: 'MyUserEditorSettings';
  bracketAutoClosing?: Maybe<Scalars['Boolean']['output']>;
  bracketPairColorization?: Maybe<Scalars['Boolean']['output']>;
  detectIndentation?: Maybe<Scalars['Boolean']['output']>;
  fontFamily?: Maybe<Scalars['String']['output']>;
  fontSize?: Maybe<Scalars['Float']['output']>;
  fontWeight?: Maybe<Scalars['String']['output']>;
  formatOnSave?: Maybe<Scalars['Boolean']['output']>;
  indentGuides?: Maybe<Scalars['Boolean']['output']>;
  indentationMode?: Maybe<Scalars['String']['output']>;
  indentationSize?: Maybe<Scalars['Int']['output']>;
  lineHeight?: Maybe<Scalars['Float']['output']>;
  wordWrap?: Maybe<Scalars['Boolean']['output']>;
};

export type MyUserLikesStats = {
  __typename?: 'MyUserLikesStats';
  history: StatsHistory;
  me: Scalars['Int']['output'];
  others: Scalars['Int']['output'];
};

export type MyUserModelStats = {
  __typename?: 'MyUserModelStats';
  created: Scalars['Int']['output'];
  likes: MyUserLikesStats;
  published: Scalars['Int']['output'];
  usage: MyUserUsageStats;
};

export type MyUserOverlayStats = {
  __typename?: 'MyUserOverlayStats';
  created: Scalars['Int']['output'];
};

export type MyUserPrivateModelUsage = {
  __typename?: 'MyUserPrivateModelUsage';
  locked: Scalars['Int']['output'];
  quota: Scalars['Float']['output'];
  usage: Scalars['Int']['output'];
};

export type MyUserPrivateWidgetUsage = {
  __typename?: 'MyUserPrivateWidgetUsage';
  locked: Scalars['Int']['output'];
  quota: Scalars['Float']['output'];
  usage: Scalars['Int']['output'];
};

export type MyUserSettings = {
  __typename?: 'MyUserSettings';
  editor?: Maybe<MyUserEditorSettings>;
};

export type MyUserStats = {
  __typename?: 'MyUserStats';
  models: MyUserModelStats;
  overlays: MyUserOverlayStats;
  widgets: MyUserWidgetStats;
};

export type MyUserStorageUsage = {
  __typename?: 'MyUserStorageUsage';
  quota: Scalars['Float']['output'];
  usage: Scalars['Float']['output'];
};

export type MyUserUsage = {
  __typename?: 'MyUserUsage';
  assistant: MyUserAssistantUsage;
  privateModels: MyUserPrivateModelUsage;
  privateWidgets: MyUserPrivateWidgetUsage;
  storage: MyUserStorageUsage;
};

export type MyUserUsageStats = {
  __typename?: 'MyUserUsageStats';
  history: StatsHistory;
  me: Scalars['Int']['output'];
  others: Scalars['Int']['output'];
};

export type MyUserWidgetStats = {
  __typename?: 'MyUserWidgetStats';
  created: Scalars['Int']['output'];
  likes: MyUserLikesStats;
  published: Scalars['Int']['output'];
  usage: MyUserUsageStats;
};

export type MyWidget = {
  __typename?: 'MyWidget';
  assets: Array<MyWidgetAsset>;
  category?: Maybe<WidgetCategory>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  externals: Array<MyWidgetExternal>;
  fields: Array<MyWidgetField>;
  games: Array<Game>;
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  language: WidgetLanguage;
  liked: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  locked?: Maybe<LockReason>;
  models: Array<MyWidgetModel>;
  permissions: Array<WidgetPermission>;
  picto?: Maybe<Media>;
  preview: Scalars['Boolean']['output'];
  resources: Array<MyWidgetResource>;
  role: WidgetAccessRole;
  size: Size;
  summary: Scalars['String']['output'];
  template: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  tutorial: Scalars['Boolean']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
  version?: Maybe<WidgetVersion>;
  visibility: WidgetVisibility;
};

export type MyWidgetAsset = {
  __typename?: 'MyWidgetAsset';
  createdAt: Scalars['Timestamp']['output'];
  data: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: WidgetAssetType;
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyWidgetCollection = {
  __typename?: 'MyWidgetCollection';
  after: Scalars['Int']['output'];
  items: Array<MyWidget>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyWidgetCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  scope?: InputMaybe<WidgetAccessScope>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyWidgetEvent = {
  __typename?: 'MyWidgetEvent';
  client?: Maybe<Scalars['String']['output']>;
  resource?: Maybe<MyWidgetEventResource>;
  revision?: Maybe<MyWidgetEventRevision>;
  type: MyWidgetEventType;
};

export type MyWidgetEventResource = {
  __typename?: 'MyWidgetEventResource';
  id: Scalars['ID']['output'];
};

export type MyWidgetEventRevision = {
  __typename?: 'MyWidgetEventRevision';
  number: Scalars['Int']['output'];
};

export enum MyWidgetEventType {
  ResourceCreated = 'RESOURCE_CREATED',
  ResourceDeleted = 'RESOURCE_DELETED',
  ResourceUpdated = 'RESOURCE_UPDATED',
  WidgetBundled = 'WIDGET_BUNDLED'
}

export type MyWidgetExternal = {
  __typename?: 'MyWidgetExternal';
  id: Scalars['ID']['output'];
  library: MyWidgetLibrary;
  version: MyWidgetLibraryVersion;
};

export type MyWidgetExternalInput = {
  libraryId: Scalars['ID']['input'];
  versionId: Scalars['ID']['input'];
};

export type MyWidgetField = {
  __typename?: 'MyWidgetField';
  createdAt: Scalars['Timestamp']['output'];
  fields: Array<MyWidgetField>;
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<MyWidgetField>;
  path: Scalars['String']['output'];
  state: Scalars['Object']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  value: Scalars['Object']['output'];
};

export type MyWidgetFieldCollection = {
  __typename?: 'MyWidgetFieldCollection';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyWidgetField>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyWidgetFieldCollectionInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CollectionOrderInput>>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetFieldInput = {
  widgetFieldId: Scalars['ID']['input'];
};

export type MyWidgetFieldList = {
  __typename?: 'MyWidgetFieldList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyWidgetField>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyWidgetFieldListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetInput = {
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetInvitation = {
  __typename?: 'MyWidgetInvitation';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  invitedBy?: Maybe<User>;
  role: WidgetMemberRole;
  updatedAt: Scalars['Timestamp']['output'];
  widget: Widget;
};

export type MyWidgetInvitationList = {
  __typename?: 'MyWidgetInvitationList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyWidgetInvitation>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyWidgetInvitationListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyWidgetLibrary = {
  __typename?: 'MyWidgetLibrary';
  createdAt: Scalars['Timestamp']['output'];
  group?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  picto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  versions: Array<MyWidgetLibraryVersion>;
};

export type MyWidgetLibraryCollection = {
  __typename?: 'MyWidgetLibraryCollection';
  after: Scalars['Int']['output'];
  items: Array<MyWidgetLibrary>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyWidgetLibraryCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyWidgetLibraryInput = {
  widgetLibraryId: Scalars['ID']['input'];
};

export type MyWidgetLibraryList = {
  __typename?: 'MyWidgetLibraryList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyWidgetLibrary>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyWidgetLibraryListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MyWidgetLibrarySelection = {
  __typename?: 'MyWidgetLibrarySelection';
  items: Array<Maybe<MyWidgetLibrary>>;
  total: Scalars['Int']['output'];
};

export type MyWidgetLibrarySelectionInput = {
  selection: Array<Scalars['ID']['input']>;
};

export type MyWidgetLibraryVersion = {
  __typename?: 'MyWidgetLibraryVersion';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  files: Array<MyWidgetLibraryVersionFile>;
  globals: Scalars['Object']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  library: MyWidgetLibrary;
  major: Scalars['Int']['output'];
  minor: Scalars['Int']['output'];
  patch: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyWidgetLibraryVersionFile = {
  __typename?: 'MyWidgetLibraryVersionFile';
  createdAt: Scalars['Timestamp']['output'];
  env?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  uri?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export enum MyWidgetLibraryVersionFileEnvironment {
  Development = 'DEVELOPMENT',
  Production = 'PRODUCTION'
}

export enum MyWidgetLibraryVersionFileType {
  Declaration = 'DECLARATION',
  Source = 'SOURCE'
}

export type MyWidgetMember = {
  __typename?: 'MyWidgetMember';
  createdAt: Scalars['Timestamp']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invitedBy?: Maybe<User>;
  role: WidgetMemberRole;
  status: WidgetMemberStatus;
  updatedAt: Scalars['Timestamp']['output'];
  user?: Maybe<User>;
};

export type MyWidgetMemberListInput = {
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetModel = {
  __typename?: 'MyWidgetModel';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos?: Maybe<Scalars['String']['output']>;
  snapshot: ModelSnapshot;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyWidgetModelCollection = {
  __typename?: 'MyWidgetModelCollection';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyWidgetModel>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyWidgetModelCollectionInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetModelInput = {
  widgetModelId: Scalars['ID']['input'];
};

export type MyWidgetModelList = {
  __typename?: 'MyWidgetModelList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<MyWidgetModel>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type MyWidgetModelListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetModelUpdate = {
  __typename?: 'MyWidgetModelUpdate';
  deprecated: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  version: ObjectClassificationModelVersion;
  widget: MyWidget;
  widgetModel: MyWidgetModel;
};

export type MyWidgetResource = {
  __typename?: 'MyWidgetResource';
  createdAt: Scalars['Timestamp']['output'];
  data: Scalars['String']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<MyWidgetResource>;
  path: Scalars['String']['output'];
  revision: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyWidgetResourceList = {
  __typename?: 'MyWidgetResourceList';
  items: Array<MyWidgetResource>;
  total: Scalars['Int']['output'];
};

export type MyWidgetResourceListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  widgetId: Scalars['ID']['input'];
};

export enum MyWidgetResourceType {
  File = 'FILE',
  Folder = 'FOLDER'
}

export type MyWidgetVersion = {
  __typename?: 'MyWidgetVersion';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  label: Scalars['String']['output'];
  listed: Scalars['Boolean']['output'];
  major: Scalars['Int']['output'];
  minor: Scalars['Int']['output'];
  notes: Scalars['String']['output'];
  patch: Scalars['Int']['output'];
  permissions: Array<WidgetPermission>;
  size: Size;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type MyWidgetVersionCollection = {
  __typename?: 'MyWidgetVersionCollection';
  after: Scalars['Int']['output'];
  items: Array<MyWidgetVersion>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MyWidgetVersionCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type MyWidgetVersionInput = {
  widgetVersionId: Scalars['ID']['input'];
};

export type ObjectClassificationModel = {
  __typename?: 'ObjectClassificationModel';
  category?: Maybe<ModelCategory>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  games: Array<Game>;
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  inferenceRate: Scalars['Float']['output'];
  infos: Scalars['String']['output'];
  liked: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  picto?: Maybe<Media>;
  stability: Scalars['Float']['output'];
  summary: Scalars['String']['output'];
  threshold: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
  version?: Maybe<ObjectClassificationModelVersion>;
};

export type ObjectClassificationModelClass = {
  __typename?: 'ObjectClassificationModelClass';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  metrics: ObjectClassificationModelClassMetrics;
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ObjectClassificationModelClassMetrics = {
  __typename?: 'ObjectClassificationModelClassMetrics';
  f1?: Maybe<Scalars['Float']['output']>;
  precision?: Maybe<Scalars['Float']['output']>;
  recall?: Maybe<Scalars['Float']['output']>;
  support: Scalars['Int']['output'];
};

export type ObjectClassificationModelFile = {
  __typename?: 'ObjectClassificationModelFile';
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  type: ObjectClassificationModelFileType;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export enum ObjectClassificationModelFileType {
  OnnxFp16Model = 'ONNX_FP16_MODEL',
  OnnxFp32Model = 'ONNX_FP32_MODEL',
  OnnxInt8Model = 'ONNX_INT8_MODEL',
  TensorflowJsModel = 'TENSORFLOW_JS_MODEL',
  TensorflowJsShard = 'TENSORFLOW_JS_SHARD',
  TensorflowLiteFp16Model = 'TENSORFLOW_LITE_FP16_MODEL',
  TensorflowLiteFp32Model = 'TENSORFLOW_LITE_FP32_MODEL',
  TensorflowLiteInt8Model = 'TENSORFLOW_LITE_INT8_MODEL'
}

export type ObjectClassificationModelImage = {
  __typename?: 'ObjectClassificationModelImage';
  createdAt: Scalars['Timestamp']['output'];
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  size: Size;
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['String']['output'];
};

export type ObjectClassificationModelLabel = {
  __typename?: 'ObjectClassificationModelLabel';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ObjectClassificationModelSnapshot = {
  __typename?: 'ObjectClassificationModelSnapshot';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  files: Array<ObjectClassificationModelFile>;
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  images: Array<ObjectClassificationModelImage>;
  inferenceRate: Scalars['Float']['output'];
  infos: Scalars['String']['output'];
  labels: Array<ObjectClassificationModelClass>;
  model: ObjectClassificationModel;
  picto?: Maybe<Media>;
  specs: ObjectClassificationModelSnapshotSpecs;
  stability: Scalars['Float']['output'];
  summary: Scalars['String']['output'];
  threshold: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
  version?: Maybe<ObjectClassificationModelVersion>;
};

export type ObjectClassificationModelSnapshotSpecs = {
  __typename?: 'ObjectClassificationModelSnapshotSpecs';
  inputColor: MlInputColor;
  inputRange: MlInputRange;
  inputShape: MlInputShape;
  inputType: Scalars['String']['output'];
};

export type ObjectClassificationModelVersion = {
  __typename?: 'ObjectClassificationModelVersion';
  createdAt: Scalars['Timestamp']['output'];
  date: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  labels: Array<ObjectClassificationModelClass>;
  major: Scalars['Int']['output'];
  metrics?: Maybe<ObjectClassificationModelVersionMetrics>;
  minor: Scalars['Int']['output'];
  notes: Scalars['String']['output'];
  patch: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ObjectClassificationModelVersionCollection = {
  __typename?: 'ObjectClassificationModelVersionCollection';
  after: Scalars['Int']['output'];
  items: Array<ObjectClassificationModelVersion>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ObjectClassificationModelVersionCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ObjectClassificationModelVersionInput = {
  objectClassificationModelVersionId: Scalars['ID']['input'];
};

export type ObjectClassificationModelVersionList = {
  __typename?: 'ObjectClassificationModelVersionList';
  items: Array<ObjectClassificationModelVersion>;
  total: Scalars['Int']['output'];
};

export type ObjectClassificationModelVersionListInput = {
  objectClassificationModelId: Scalars['ID']['input'];
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
};

export type ObjectClassificationModelVersionMetrics = {
  __typename?: 'ObjectClassificationModelVersionMetrics';
  accuracy: Scalars['Float']['output'];
  f1: Scalars['Float']['output'];
  loss: Scalars['Float']['output'];
  prAuc: Scalars['Float']['output'];
  precision: Scalars['Float']['output'];
  recall: Scalars['Float']['output'];
  rocAuc: Scalars['Float']['output'];
};

export type ObjectDetectionModel = {
  __typename?: 'ObjectDetectionModel';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  picto?: Maybe<Media>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
};

export type ObjectDetectionModelSnapshot = {
  __typename?: 'ObjectDetectionModelSnapshot';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  inferenceRate: Scalars['Float']['output'];
  infos: Scalars['String']['output'];
  model: ObjectClassificationModel;
  picto?: Maybe<Media>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
  version?: Maybe<ObjectDetectionModelVersion>;
};

export type ObjectDetectionModelVersion = {
  __typename?: 'ObjectDetectionModelVersion';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  listed: Scalars['Boolean']['output'];
  major: Scalars['Int']['output'];
  minor: Scalars['Int']['output'];
  notes: Scalars['String']['output'];
  patch: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type Overlay = {
  __typename?: 'Overlay';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  picto?: Maybe<Media>;
  size: Size;
  theme: Scalars['String']['output'];
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
  twitchAuthToken?: Maybe<MyTwitchAccessToken>;
  updatedAt: Scalars['Timestamp']['output'];
  widgets: Array<OverlayWidget>;
};

export type OverlayInput = {
  token: Scalars['String']['input'];
};

export type OverlayWidget = {
  __typename?: 'OverlayWidget';
  anchor: Point;
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  display: OverlayWidgetDisplay;
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos?: Maybe<Scalars['String']['output']>;
  origin: Point;
  size: Size;
  snapshot: WidgetSnapshot;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
  values: Scalars['Object']['output'];
};

export type OverlayWidgetDisplay = {
  __typename?: 'OverlayWidgetDisplay';
  hideTransition: OverlayWidgetDisplayTransition;
  initial: OverlayWidgetDisplayInitial;
  rules: Array<OverlayWidgetDisplayRule>;
  showTransition: OverlayWidgetDisplayTransition;
};

export type OverlayWidgetDisplayEventRule = {
  __typename?: 'OverlayWidgetDisplayEventRule';
  cooldown: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  event: Scalars['String']['output'];
};

export enum OverlayWidgetDisplayInitial {
  Hidden = 'HIDDEN',
  Visible = 'VISIBLE'
}

export type OverlayWidgetDisplayInput = {
  hideTransition: OverlayWidgetDisplayTransitionInput;
  initial: OverlayWidgetDisplayInitial;
  rules: Array<OverlayWidgetDisplayRuleInput>;
  showTransition: OverlayWidgetDisplayTransitionInput;
};

export type OverlayWidgetDisplayModelRule = {
  __typename?: 'OverlayWidgetDisplayModelRule';
  labels: Array<Scalars['ID']['output']>;
  model: Scalars['ID']['output'];
  snapshot?: Maybe<ModelSnapshot>;
  stability?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['ID']['output']>;
};

export type OverlayWidgetDisplayRule = OverlayWidgetDisplayEventRule | OverlayWidgetDisplayModelRule | OverlayWidgetDisplayTimerRule;

export type OverlayWidgetDisplayRuleInput = {
  cooldown?: InputMaybe<Scalars['Float']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['Float']['input']>;
  labels?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<Scalars['ID']['input']>;
  stability?: InputMaybe<Scalars['Float']['input']>;
  threshold?: InputMaybe<Scalars['Float']['input']>;
  type: OverlayWidgetDisplayRuleType;
  version?: InputMaybe<Scalars['ID']['input']>;
};

export enum OverlayWidgetDisplayRuleType {
  Event = 'EVENT',
  Model = 'MODEL',
  Timer = 'TIMER'
}

export type OverlayWidgetDisplayTimerRule = {
  __typename?: 'OverlayWidgetDisplayTimerRule';
  duration: Scalars['Float']['output'];
  interval: Scalars['Float']['output'];
};

export type OverlayWidgetDisplayTransition = {
  __typename?: 'OverlayWidgetDisplayTransition';
  delay: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  easing: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type OverlayWidgetDisplayTransitionInput = {
  delay: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
  easing: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  prices: Array<PlanPrice>;
  quotas: Array<PlanQuota>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type PlanCollection = {
  __typename?: 'PlanCollection';
  after: Scalars['Int']['output'];
  items: Array<Plan>;
  limit: Scalars['Int']['output'];
  query?: Maybe<Scalars['Object']['output']>;
  total: Scalars['Int']['output'];
};

export type PlanCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type PlanInput = {
  planId: Scalars['ID']['input'];
};

export type PlanPrice = {
  __typename?: 'PlanPrice';
  createdAt: Scalars['Timestamp']['output'];
  cycle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  value: Scalars['Int']['output'];
};

export type PlanQuota = {
  __typename?: 'PlanQuota';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  value: Scalars['Float']['output'];
};

export type Point = {
  __typename?: 'Point';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type PointInput = {
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  assistantCreditPackList: AssistantCreditPackList;
  claudeModelList: ClaudeModelList;
  game?: Maybe<Game>;
  gameCollection: GameCollection;
  gameSelection: GameSelection;
  language?: Maybe<Language>;
  languageList: LanguageList;
  latestAppReleaseList: AppReleaseList;
  media?: Maybe<Media>;
  medias: Array<Media>;
  model?: Maybe<ModelResult>;
  modelCategory?: Maybe<ModelCategory>;
  modelCategoryList: ModelCategoryList;
  modelCollection: ModelCollection;
  modelCollectionByCategory: ModelCollectionByCategory;
  myAssistantSettings: MyAssistantSettings;
  myClaudeAccount?: Maybe<MyClaudeAccount>;
  myMedia?: Maybe<MyMedia>;
  myMediaCollection: MyMediaCollection;
  myModel?: Maybe<MyModel>;
  myModelCollection: MyModelCollection;
  myModelInvitationList: MyModelInvitationList;
  myModelMemberList: Array<MyModelMember>;
  myObjectClassificationModel: MyObjectClassificationModel;
  myObjectClassificationModelImage?: Maybe<MyObjectClassificationModelImage>;
  myObjectClassificationModelImageCollection: MyObjectClassificationModelImageCollection;
  myObjectClassificationModelLabel?: Maybe<MyObjectClassificationModelLabel>;
  myObjectClassificationModelLabelCollection: MyObjectClassificationModelLabelCollection;
  myObjectClassificationModelLabelList: MyObjectClassificationModelLabelList;
  myObjectClassificationModelLabelSelection: MyObjectClassificationModelLabelSelection;
  myObjectClassificationModelTraining?: Maybe<MyObjectClassificationModelTraining>;
  myObjectClassificationModelTrainingCollection: MyObjectClassificationModelTrainingCollection;
  myObjectClassificationModelTrainingList: MyObjectClassificationModelTrainingList;
  myObjectClassificationModelVersion?: Maybe<MyObjectClassificationModelVersion>;
  myObjectClassificationModelVersionCollection: MyObjectClassificationModelVersionCollection;
  myOverlay?: Maybe<MyOverlay>;
  myOverlayCollection: MyOverlayCollection;
  myTwitchAccessToken?: Maybe<MyTwitchAccessToken>;
  myUpdateList: MyUpdateList;
  myUser?: Maybe<MyUser>;
  myWidget?: Maybe<MyWidget>;
  myWidgetCollection: MyWidgetCollection;
  myWidgetField?: Maybe<MyWidgetField>;
  myWidgetFieldCollection: MyWidgetFieldCollection;
  myWidgetFieldList: MyWidgetFieldList;
  myWidgetInvitationList: MyWidgetInvitationList;
  myWidgetLibrary?: Maybe<MyWidgetLibrary>;
  myWidgetLibraryCollection: MyWidgetLibraryCollection;
  myWidgetLibraryList: MyWidgetLibraryList;
  myWidgetLibrarySelection: MyWidgetLibrarySelection;
  myWidgetMemberList: Array<MyWidgetMember>;
  myWidgetModel?: Maybe<MyWidgetModel>;
  myWidgetModelCollection: MyWidgetModelCollection;
  myWidgetModelList: MyWidgetModelList;
  myWidgetResourceList: MyWidgetResourceList;
  myWidgetVersion?: Maybe<MyWidgetVersion>;
  myWidgetVersionCollection: MyWidgetVersionCollection;
  objectClassificationModelVersion?: Maybe<ObjectClassificationModelVersion>;
  objectClassificationModelVersionCollection: ObjectClassificationModelVersionCollection;
  objectClassificationModelVersionList: ObjectClassificationModelVersionList;
  overlay?: Maybe<Overlay>;
  plan?: Maybe<Plan>;
  planCollection: PlanCollection;
  resolution?: Maybe<Resolution>;
  resolutionList: ResolutionList;
  widget?: Maybe<WidgetResult>;
  widgetCategory?: Maybe<WidgetCategory>;
  widgetCategoryList: WidgetCategoryList;
  widgetCollection: WidgetCollection;
  widgetCollectionByCategory: WidgetCollectionByCategory;
  widgetVersion?: Maybe<WidgetVersion>;
  widgetVersionCollection: WidgetVersionCollection;
};


export type QueryAssistantCreditPackListArgs = {
  input: AssistantCreditPackListInput;
};


export type QueryClaudeModelListArgs = {
  input: ClaudeModelListInput;
};


export type QueryGameArgs = {
  input: GameInput;
};


export type QueryGameCollectionArgs = {
  input?: InputMaybe<GameCollectionInput>;
};


export type QueryGameSelectionArgs = {
  input: GameSelectionInput;
};


export type QueryLanguageArgs = {
  input: LanguageInput;
};


export type QueryLanguageListArgs = {
  input: LanguageListInput;
};


export type QueryLatestAppReleaseListArgs = {
  input?: InputMaybe<LatestAppReleaseListInput>;
};


export type QueryMediaArgs = {
  input: MediaInput;
};


export type QueryMediasArgs = {
  input: MediasInput;
};


export type QueryModelArgs = {
  input: ModelInput;
};


export type QueryModelCategoryArgs = {
  input: ModelCategoryInput;
};


export type QueryModelCategoryListArgs = {
  input?: InputMaybe<ModelCategoryListInput>;
};


export type QueryModelCollectionArgs = {
  input?: InputMaybe<ModelCollectionInput>;
};


export type QueryModelCollectionByCategoryArgs = {
  input?: InputMaybe<ModelCollectionByCategoryInput>;
};


export type QueryMyMediaArgs = {
  input: MyMediaInput;
};


export type QueryMyMediaCollectionArgs = {
  input?: InputMaybe<MyMediaCollectionInput>;
};


export type QueryMyModelArgs = {
  input: MyModelInput;
};


export type QueryMyModelCollectionArgs = {
  input?: InputMaybe<MyModelCollectionInput>;
};


export type QueryMyModelInvitationListArgs = {
  input?: InputMaybe<MyModelInvitationListInput>;
};


export type QueryMyModelMemberListArgs = {
  input: MyModelMemberListInput;
};


export type QueryMyObjectClassificationModelArgs = {
  input: MyObjectClassificationModelInput;
};


export type QueryMyObjectClassificationModelImageArgs = {
  input: MyObjectClassificationModelImageInput;
};


export type QueryMyObjectClassificationModelImageCollectionArgs = {
  input?: InputMaybe<MyObjectClassificationModelImageCollectionInput>;
};


export type QueryMyObjectClassificationModelLabelArgs = {
  input: MyObjectClassificationModelLabelInput;
};


export type QueryMyObjectClassificationModelLabelCollectionArgs = {
  input?: InputMaybe<MyObjectClassificationModelLabelCollectionInput>;
};


export type QueryMyObjectClassificationModelLabelListArgs = {
  input?: InputMaybe<MyObjectClassificationModelLabelListInput>;
};


export type QueryMyObjectClassificationModelLabelSelectionArgs = {
  input: MyObjectClassificationModelLabelSelectionInput;
};


export type QueryMyObjectClassificationModelTrainingArgs = {
  input: MyObjectClassificationModelTrainingInput;
};


export type QueryMyObjectClassificationModelTrainingCollectionArgs = {
  input?: InputMaybe<MyObjectClassificationModelTrainingCollectionInput>;
};


export type QueryMyObjectClassificationModelTrainingListArgs = {
  input?: InputMaybe<MyObjectClassificationModelTrainingListInput>;
};


export type QueryMyObjectClassificationModelVersionArgs = {
  input?: InputMaybe<MyObjectClassificationModelVersionInput>;
};


export type QueryMyObjectClassificationModelVersionCollectionArgs = {
  input?: InputMaybe<MyObjectClassificationModelVersionCollectionInput>;
};


export type QueryMyOverlayArgs = {
  input: MyOverlayInput;
};


export type QueryMyOverlayCollectionArgs = {
  input: MyOverlayCollectionInput;
};


export type QueryMyUpdateListArgs = {
  input?: InputMaybe<MyUpdateListInput>;
};


export type QueryMyWidgetArgs = {
  input: MyWidgetInput;
};


export type QueryMyWidgetCollectionArgs = {
  input: MyWidgetCollectionInput;
};


export type QueryMyWidgetFieldArgs = {
  input: MyWidgetFieldInput;
};


export type QueryMyWidgetFieldCollectionArgs = {
  input: MyWidgetFieldCollectionInput;
};


export type QueryMyWidgetFieldListArgs = {
  input: MyWidgetFieldListInput;
};


export type QueryMyWidgetInvitationListArgs = {
  input?: InputMaybe<MyWidgetInvitationListInput>;
};


export type QueryMyWidgetLibraryArgs = {
  input: MyWidgetLibraryInput;
};


export type QueryMyWidgetLibraryCollectionArgs = {
  input?: InputMaybe<MyWidgetLibraryCollectionInput>;
};


export type QueryMyWidgetLibraryListArgs = {
  input?: InputMaybe<MyWidgetLibraryListInput>;
};


export type QueryMyWidgetLibrarySelectionArgs = {
  input: MyWidgetLibrarySelectionInput;
};


export type QueryMyWidgetMemberListArgs = {
  input: MyWidgetMemberListInput;
};


export type QueryMyWidgetModelArgs = {
  input: MyWidgetModelInput;
};


export type QueryMyWidgetModelCollectionArgs = {
  input: MyWidgetModelCollectionInput;
};


export type QueryMyWidgetModelListArgs = {
  input: MyWidgetModelListInput;
};


export type QueryMyWidgetResourceListArgs = {
  input: MyWidgetResourceListInput;
};


export type QueryMyWidgetVersionArgs = {
  input: MyWidgetVersionInput;
};


export type QueryMyWidgetVersionCollectionArgs = {
  input?: InputMaybe<MyWidgetVersionCollectionInput>;
};


export type QueryObjectClassificationModelVersionArgs = {
  input: ObjectClassificationModelVersionInput;
};


export type QueryObjectClassificationModelVersionCollectionArgs = {
  input?: InputMaybe<ObjectClassificationModelVersionCollectionInput>;
};


export type QueryObjectClassificationModelVersionListArgs = {
  input: ObjectClassificationModelVersionListInput;
};


export type QueryOverlayArgs = {
  input: OverlayInput;
};


export type QueryPlanArgs = {
  input: PlanInput;
};


export type QueryPlanCollectionArgs = {
  input?: InputMaybe<PlanCollectionInput>;
};


export type QueryResolutionArgs = {
  input: ResolutionInput;
};


export type QueryResolutionListArgs = {
  input?: InputMaybe<ResolutionListInput>;
};


export type QueryWidgetArgs = {
  input: WidgetInput;
};


export type QueryWidgetCategoryArgs = {
  input: WidgetCategoryInput;
};


export type QueryWidgetCategoryListArgs = {
  input?: InputMaybe<WidgetCategoryListInput>;
};


export type QueryWidgetCollectionArgs = {
  input: WidgetCollectionInput;
};


export type QueryWidgetCollectionByCategoryArgs = {
  input: WidgetCollectionByCategoryInput;
};


export type QueryWidgetVersionArgs = {
  input: WidgetVersionInput;
};


export type QueryWidgetVersionCollectionArgs = {
  input?: InputMaybe<WidgetVersionCollectionInput>;
};

export type RecoverUserPasswordInput = {
  captcha?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type RefreshMyTwitchAccessTokenInput = {
  twitchAccessTokenId: Scalars['ID']['input'];
};

export type RefreshOverlayTwitchAccessTokenInput = {
  token: Scalars['String']['input'];
};

export type RegenerateMyOverlayTokenInput = {
  overlayId: Scalars['ID']['input'];
};

export type RemoveMyOverlayWidgetInput = {
  overlayWidgetId: Scalars['ID']['input'];
};

export type ResetUserPasswordInput = {
  passw: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Resolution = {
  __typename?: 'Resolution';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  size: Size;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ResolutionInput = {
  resolutionId: Scalars['ID']['input'];
};

export type ResolutionList = {
  __typename?: 'ResolutionList';
  after: Scalars['Int']['output'];
  items: Array<Resolution>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ResolutionListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type RevokeMyTwitchAccessTokenInput = {
  twitchAccessTokenId: Scalars['ID']['input'];
};

export type SelectMyOverlayWidgetVersionInput = {
  overlayWidgetId: Scalars['ID']['input'];
  widgetVersionId?: InputMaybe<Scalars['ID']['input']>;
};

export type SelectMyWidgetModelVersionInput = {
  modelVersionId: Scalars['ID']['input'];
  widgetModelId: Scalars['ID']['input'];
};

export type SendMyWidgetAssistantMessageInput = {
  effort?: InputMaybe<Scalars['String']['input']>;
  history?: InputMaybe<Array<AssistantHistoryEntryInput>>;
  message: Scalars['String']['input'];
  model?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['Timestamp']['output'];
  expiresDate: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  startedDate: Scalars['Timestamp']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
};

export type SignInUserInput = {
  captcha?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  passw: Scalars['String']['input'];
};

export type SignInUserWithProviderInput = {
  captcha?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  invite?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
};

export type SignUpUserInput = {
  captcha?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  invite?: InputMaybe<Scalars['String']['input']>;
  lastname: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  passw: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Size = {
  __typename?: 'Size';
  h: Scalars['Float']['output'];
  w: Scalars['Float']['output'];
};

export type SizeInput = {
  h: Scalars['Float']['input'];
  w: Scalars['Float']['input'];
};

export type StatsHistory = {
  __typename?: 'StatsHistory';
  points: Array<StatsHistoryPoint>;
  unit: StatsHistoryUnit;
};

export type StatsHistoryPoint = {
  __typename?: 'StatsHistoryPoint';
  date: Scalars['Timestamp']['output'];
  value: Scalars['Int']['output'];
};

export enum StatsHistoryUnit {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Subscription = {
  __typename?: 'Subscription';
  streamMyWidgetAssistantMessage: AssistantEvent;
  watchMyWidget: MyWidgetEvent;
};


export type SubscriptionStreamMyWidgetAssistantMessageArgs = {
  input: SendMyWidgetAssistantMessageInput;
};


export type SubscriptionWatchMyWidgetArgs = {
  input: WatchMyWidgetInput;
};

export type ToggleModelLikeInput = {
  modelId: Scalars['ID']['input'];
};

export type ToggleWidgetLikeInput = {
  widgetId: Scalars['ID']['input'];
};

export type UpdateMyAssistantSettingsInput = {
  effort?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyMediaInput = {
  file: Scalars['Upload']['input'];
  mediaId: Scalars['ID']['input'];
};

export type UpdateMyModelMemberInput = {
  modelMemberId: Scalars['ID']['input'];
  role: ModelMemberRole;
};

export type UpdateMyObjectClassificationModelAnnotationEntryInput = {
  objectClassificationModelLabelId: Scalars['ID']['input'];
  status?: InputMaybe<MyObjectClassificationModelAnnotationStatus>;
};

export type UpdateMyObjectClassificationModelImageEntryInput = {
  annotations?: InputMaybe<Array<UpdateMyObjectClassificationModelAnnotationEntryInput>>;
  infos?: InputMaybe<Scalars['String']['input']>;
  objectClassificationModelImageId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyObjectClassificationModelImagesInput = {
  items: Array<UpdateMyObjectClassificationModelImageEntryInput>;
};

export type UpdateMyObjectClassificationModelInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  gameIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  glyph?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  inferenceRate?: InputMaybe<Scalars['Float']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  objectClassificationModelId: Scalars['ID']['input'];
  pictoId?: InputMaybe<Scalars['ID']['input']>;
  stability?: InputMaybe<Scalars['Float']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  threshold?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyObjectClassificationModelLabelInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  objectClassificationModelLabelId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyObjectClassificationModelVersionInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  objectClassificationModelVersionId: Scalars['ID']['input'];
};

export type UpdateMyOverlayInput = {
  imageId?: InputMaybe<Scalars['ID']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  overlayId: Scalars['ID']['input'];
  pictoId?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<UpdateMyOverlaySizeInput>;
  theme?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyOverlaySizeInput = {
  h: Scalars['Int']['input'];
  w: Scalars['Int']['input'];
};

export type UpdateMyOverlayWidgetInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  anchor?: InputMaybe<PointInput>;
  display?: InputMaybe<OverlayWidgetDisplayInput>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  origin?: InputMaybe<PointInput>;
  overlayWidgetId: Scalars['ID']['input'];
  size?: InputMaybe<SizeInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<UpdateMyOverlayWidgetValueInput>>;
};

export type UpdateMyOverlayWidgetValueInput = {
  field: Scalars['ID']['input'];
  value: Scalars['Mixed']['input'];
};

export type UpdateMyOwnWidgetSizeInput = {
  h: Scalars['Int']['input'];
  w: Scalars['Int']['input'];
};

export type UpdateMyUserEditorSettingsInput = {
  bracketAutoClosing?: InputMaybe<Scalars['Boolean']['input']>;
  bracketPairColorization?: InputMaybe<Scalars['Boolean']['input']>;
  detectIndentation?: InputMaybe<Scalars['Boolean']['input']>;
  fontFamily?: InputMaybe<Scalars['String']['input']>;
  fontSize?: InputMaybe<Scalars['Float']['input']>;
  fontWeight?: InputMaybe<Scalars['String']['input']>;
  formatOnSave?: InputMaybe<Scalars['Boolean']['input']>;
  indentGuides?: InputMaybe<Scalars['Boolean']['input']>;
  indentationMode?: InputMaybe<Scalars['String']['input']>;
  indentationSize?: InputMaybe<Scalars['Int']['input']>;
  lineHeight?: InputMaybe<Scalars['Float']['input']>;
  wordWrap?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateMyUserEmailInput = {
  email: Scalars['String']['input'];
  passw: Scalars['String']['input'];
};

export type UpdateMyUserInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<UpdateMyUserSettingsInput>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyUserPasswordInput = {
  passc: Scalars['String']['input'];
  passn: Scalars['String']['input'];
  passw: Scalars['String']['input'];
};

export type UpdateMyUserPhoneInput = {
  passw: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyUserSettingsInput = {
  editor?: InputMaybe<UpdateMyUserEditorSettingsInput>;
};

export type UpdateMyWidgetFieldInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  state?: InputMaybe<Scalars['Object']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Object']['input']>;
  widgetFieldId: Scalars['ID']['input'];
};

export type UpdateMyWidgetInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  externals?: InputMaybe<Array<MyWidgetExternalInput>>;
  gameIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  glyph?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  infos?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<WidgetPermissionInput>>;
  pictoId?: InputMaybe<Scalars['ID']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  size?: InputMaybe<UpdateMyOwnWidgetSizeInput>;
  summary?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<WidgetVisibility>;
  widgetId: Scalars['ID']['input'];
};

export type UpdateMyWidgetMemberInput = {
  role: WidgetMemberRole;
  widgetMemberId: Scalars['ID']['input'];
};

export type UpdateMyWidgetResourceInput = {
  client?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  revision?: InputMaybe<Scalars['Int']['input']>;
  widgetResourceId: Scalars['ID']['input'];
};

export type UpdateMyWidgetResourcesInput = {
  items: Array<UpdateMyWidgetResourceInput>;
};

export type UpdateMyWidgetVersionInput = {
  infos?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  widgetVersionId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  nickname: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type VerifyUserInput = {
  token: Scalars['String']['input'];
};

export type WatchMyWidgetInput = {
  widgetId: Scalars['ID']['input'];
};

export type Widget = {
  __typename?: 'Widget';
  category?: Maybe<WidgetCategory>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  games: Array<Game>;
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  liked: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  picto?: Maybe<Media>;
  preview: Scalars['Boolean']['output'];
  size: Size;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
  version?: Maybe<WidgetVersion>;
  visibility: WidgetVisibility;
};

export enum WidgetAccessRole {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  User = 'USER',
  Viewer = 'VIEWER'
}

export enum WidgetAccessScope {
  All = 'ALL',
  Owned = 'OWNED',
  Shared = 'SHARED'
}

export type WidgetAsset = {
  __typename?: 'WidgetAsset';
  createdAt: Scalars['Timestamp']['output'];
  data: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: WidgetAssetType;
  updatedAt: Scalars['Timestamp']['output'];
};

export enum WidgetAssetType {
  Css = 'CSS',
  ExternalJs = 'EXTERNAL_JS',
  Html = 'HTML',
  Js = 'JS'
}

export type WidgetCategory = {
  __typename?: 'WidgetCategory';
  count: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  picto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type WidgetCategoryInput = {
  widgetCategoryId: Scalars['ID']['input'];
};

export type WidgetCategoryList = {
  __typename?: 'WidgetCategoryList';
  after?: Maybe<Scalars['Int']['output']>;
  items: Array<WidgetCategory>;
  limit?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type WidgetCategoryListInput = {
  after?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ListOrderInput>>;
  query?: InputMaybe<Array<ListQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type WidgetCollection = {
  __typename?: 'WidgetCollection';
  after: Scalars['Int']['output'];
  items: Array<WidgetResult>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type WidgetCollectionByCategory = {
  __typename?: 'WidgetCollectionByCategory';
  after: Scalars['Int']['output'];
  items: Array<WidgetCollectionByCategoryItem>;
  limit: Scalars['Int']['output'];
  query?: Maybe<Scalars['Object']['output']>;
  total: Scalars['Int']['output'];
};

export type WidgetCollectionByCategoryInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type WidgetCollectionByCategoryItem = {
  __typename?: 'WidgetCollectionByCategoryItem';
  after: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  items: Array<WidgetResult>;
  limit: Scalars['Int']['output'];
  picto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type WidgetCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type WidgetCollectionQueryInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type WidgetField = {
  __typename?: 'WidgetField';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<WidgetField>;
  path: Scalars['String']['output'];
  state: Scalars['Object']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  value: Scalars['Object']['output'];
};

export type WidgetInput = {
  widgetId: Scalars['ID']['input'];
};

export enum WidgetLanguage {
  Javascript = 'JAVASCRIPT',
  Typescript = 'TYPESCRIPT'
}

export enum WidgetMemberRole {
  Editor = 'EDITOR',
  User = 'USER',
  Viewer = 'VIEWER'
}

export enum WidgetMemberStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type WidgetModel = {
  __typename?: 'WidgetModel';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  infos?: Maybe<Scalars['String']['output']>;
  snapshot: ModelSnapshot;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
};

export type WidgetPermission = {
  __typename?: 'WidgetPermission';
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  scope: Scalars['String']['output'];
};

export type WidgetPermissionInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type WidgetResult = MyWidget | Widget;

export type WidgetSnapshot = {
  __typename?: 'WidgetSnapshot';
  assets: Array<WidgetAsset>;
  category?: Maybe<WidgetCategory>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  fields: Array<WidgetField>;
  games: Array<Game>;
  glyph?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  infos: Scalars['String']['output'];
  language: WidgetLanguage;
  likes: Scalars['Int']['output'];
  models: Array<WidgetModel>;
  permissions: Array<WidgetPermission>;
  picto?: Maybe<Media>;
  preview: Scalars['Boolean']['output'];
  size: Size;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  usage: Scalars['Int']['output'];
  user: User;
  version?: Maybe<WidgetVersion>;
  visibility: WidgetVisibility;
  widget: Widget;
};

export type WidgetVersion = {
  __typename?: 'WidgetVersion';
  createdAt: Scalars['Timestamp']['output'];
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  infos: Scalars['String']['output'];
  label: Scalars['String']['output'];
  major: Scalars['Int']['output'];
  minor: Scalars['Int']['output'];
  notes: Scalars['String']['output'];
  patch: Scalars['Int']['output'];
  permissions: Array<WidgetPermission>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type WidgetVersionCollection = {
  __typename?: 'WidgetVersionCollection';
  after: Scalars['Int']['output'];
  items: Array<WidgetVersion>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type WidgetVersionCollectionInput = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Array<CollectionOrderInput>>;
  query?: InputMaybe<Array<CollectionQueryInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  widgetId: Scalars['ID']['input'];
};

export type WidgetVersionInput = {
  widgetVersionId: Scalars['ID']['input'];
};

export enum WidgetVisibility {
  Conditional = 'CONDITIONAL',
  Persistent = 'PERSISTENT'
}
