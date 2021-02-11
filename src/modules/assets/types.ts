import {Asset, BrowserView, AssetItem, HttpError, Order, Tag} from '@types'

import {AssetsActionTypes} from './index'

// Reducer

export type AssetsReducerState = {
  allIds: string[]
  byIds: Record<string, AssetItem>
  fetchCount: number
  fetching: boolean
  fetchingError: any
  lastPicked?: string
  order: Order
  pageIndex: number
  pageSize: number
  view: BrowserView
  // totalCount: number
}

// Actions

export type AssetsClearAction = {
  type: AssetsActionTypes.CLEAR
}

export type AssetsDeleteCompleteAction = {
  payload: {
    assetId: string
    closeDialogId?: string
  }
  type: AssetsActionTypes.DELETE_COMPLETE
}

export type AssetsDeleteErrorAction = {
  payload: {
    asset: Asset
    error: HttpError
  }
  type: AssetsActionTypes.DELETE_ERROR
}

export type AssetsDeletePickedAction = {
  type: AssetsActionTypes.DELETE_PICKED
}

export type AssetsDeleteRequestAction = {
  payload: {asset: Asset; closeDialogId?: string}
  type: AssetsActionTypes.DELETE_REQUEST
}

export type AssetsFetchCompleteAction = {
  payload: {
    assets: Asset[]
    // totalCount: number
  }
  type: AssetsActionTypes.FETCH_COMPLETE
}

export type AssetsFetchErrorAction = {
  payload: {error: HttpError}
  type: AssetsActionTypes.FETCH_ERROR
}

export type AssetsFetchRequestAction = {
  payload: {
    params: Record<string, string>
    query: string
  }
  type: AssetsActionTypes.FETCH_REQUEST
}

export type AssetsListenerDeleteCompleteAction = {
  payload: {assetIds: string[]}
  type: AssetsActionTypes.LISTENER_DELETE_COMPLETE
}

export type AssetsListenerDeleteQueueAction = {
  payload: {assetId: string}
  type: AssetsActionTypes.LISTENER_DELETE_QUEUE
}

export type AssetsListenerUpdateCompleteAction = {
  payload: {assets: Asset[]}
  type: AssetsActionTypes.LISTENER_UPDATE_COMPLETE
}

export type AssetsListenerUpdateQueueAction = {
  payload: {asset: Asset}
  type: AssetsActionTypes.LISTENER_UPDATE_QUEUE
}

export type AssetsLoadNextPageAction = {
  type: AssetsActionTypes.LOAD_NEXT_PAGE
}

export type AssetsLoadPageIndexAction = {
  payload: {pageIndex: number}
  type: AssetsActionTypes.LOAD_PAGE_INDEX
}

export type AssetsOrderSetAction = {
  payload: {order: Order}
  type: AssetsActionTypes.ORDER_SET
}

export type AssetsPickAction = {
  payload: {
    assetId: string
    picked: boolean
  }
  type: AssetsActionTypes.PICK
}

export type AssetsPickAllAction = {
  type: AssetsActionTypes.PICK_ALL
}

export type AssetsPickClearAction = {
  type: AssetsActionTypes.PICK_CLEAR
}

export type AssetsPickRangeAction = {
  payload: {
    endId: string
    startId: string
  }
  type: AssetsActionTypes.PICK_RANGE
}

export type AssetsSortAction = {
  type: AssetsActionTypes.SORT
}

export type AssetsTagsAddAction = {
  payload: {assets: AssetItem[]; tag: Tag}
  type: AssetsActionTypes.TAGS_ADD_REQUEST
}

export type AssetsTagsAddCompleteAction = {
  payload: {assets: AssetItem[]; tag: Tag}
  type: AssetsActionTypes.TAGS_ADD_COMPLETE
}

export type AssetsTagsAddErrorAction = {
  payload: {assets: AssetItem[]; error: HttpError; tag: Tag}
  type: AssetsActionTypes.TAGS_ADD_ERROR
}

export type AssetsTagsRemoveAction = {
  payload: {assets: AssetItem[]; tag: Tag}
  type: AssetsActionTypes.TAGS_REMOVE_REQUEST
}

export type AssetsTagsRemoveCompleteAction = {
  payload: {assets: AssetItem[]; tag: Tag}
  type: AssetsActionTypes.TAGS_REMOVE_COMPLETE
}

export type AssetsTagsRemoveErrorAction = {
  payload: {assets: AssetItem[]; error: HttpError; tag: Tag}
  type: AssetsActionTypes.TAGS_REMOVE_ERROR
}

export type AssetsUpdateCompleteAction = {
  payload: {
    assetId: string
    closeDialogId?: string
  }
  type: AssetsActionTypes.UPDATE_COMPLETE
}

export type AssetsUpdateErrorAction = {
  payload: {
    asset: Asset
    error: HttpError
  }
  type: AssetsActionTypes.UPDATE_ERROR
}

export type AssetsUpdateRequestAction = {
  payload: {
    asset: Asset
    closeDialogId?: string
    formData: Record<string, any>
  }
  type: AssetsActionTypes.UPDATE_REQUEST
}

export type AssetsViewSetAction = {
  payload: {view: BrowserView}
  type: AssetsActionTypes.VIEW_SET
}

// All actions

export type AssetsActions =
  | AssetsClearAction
  | AssetsDeleteCompleteAction
  | AssetsDeleteErrorAction
  | AssetsDeletePickedAction
  | AssetsDeleteRequestAction
  | AssetsFetchCompleteAction
  | AssetsFetchErrorAction
  | AssetsFetchRequestAction
  | AssetsListenerDeleteCompleteAction
  | AssetsListenerDeleteQueueAction
  | AssetsListenerUpdateCompleteAction
  | AssetsListenerUpdateQueueAction
  | AssetsLoadNextPageAction
  | AssetsLoadPageIndexAction
  | AssetsOrderSetAction
  | AssetsPickAction
  | AssetsPickAllAction
  | AssetsPickClearAction
  | AssetsPickRangeAction
  | AssetsSortAction
  | AssetsTagsAddAction
  | AssetsTagsAddCompleteAction
  | AssetsTagsAddErrorAction
  | AssetsTagsRemoveAction
  | AssetsTagsRemoveCompleteAction
  | AssetsTagsRemoveErrorAction
  | AssetsUpdateCompleteAction
  | AssetsUpdateErrorAction
  | AssetsUpdateRequestAction
  | AssetsViewSetAction
