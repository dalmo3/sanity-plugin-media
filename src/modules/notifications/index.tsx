import {ReactNode} from 'react'
import pluralize from 'pluralize'
import produce from 'immer'
import {ofType} from 'redux-observable'
import {of} from 'rxjs'
import {bufferTime, filter, mergeMap} from 'rxjs/operators'
import {AssetsActionTypes} from '../assets'
import {NotificationsReducerState, NotificationsActions} from './types'

/***********
 * ACTIONS *
 ***********/

export enum NotificationsActionTypes {
  ADD = 'NOTIFICATIONS_ADD'
}

/***********
 * REDUCER *
 ***********/

const INITIAL_STATE = {
  items: []
}

export default function notificationsReducer(
  state: NotificationsReducerState = INITIAL_STATE,
  action: NotificationsActions
) {
  return produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case NotificationsActionTypes.ADD: {
        const asset = action.payload?.asset
        const status = action.payload?.status
        const subtitle = action.payload?.subtitle
        const timeout = action.payload?.timeout
        const title = action.payload?.title

        draft.items.push({
          asset,
          id: String(new Date().getTime() + Math.floor(Math.random() * 10000)),
          status,
          subtitle,
          timeout,
          title
        })
        break
      }
    }
  })
}

/*******************
 * ACTION CREATORS *
 *******************/

// Add error notification
export const notificationsAddError = ({
  subtitle,
  title
}: {
  subtitle?: string
  title: ReactNode
}) => ({
  payload: {
    subtitle,
    status: 'error',
    timeout: 8000,
    title
  },
  type: NotificationsActionTypes.ADD
})

// Add success notification
export const notificationsAddSuccess = ({
  subtitle,
  title
}: {
  subtitle?: string
  title: ReactNode
}) => ({
  payload: {
    subtitle,
    status: 'success',
    timeout: 4000,
    title
  },
  type: NotificationsActionTypes.ADD
})

/*********
 * EPICS *
 *********/

/**
 * Listen for successful asset deletions:
 * - Display success notification
 * - Buffer responses over 1000ms
 */

export const notificationsAddSuccessEpic = (action$: any) =>
  action$.pipe(
    ofType(AssetsActionTypes.DELETE_COMPLETE),
    bufferTime(1000),
    filter((actions: any) => actions.length > 0),
    mergeMap((actions: any) => {
      const deletedCount = actions.length
      return of(
        notificationsAddSuccess({
          title: `${deletedCount} ${pluralize('image', deletedCount)} deleted`
        })
      )
    })
  )

/**
 * Listen for asset delete errors
 * - Display error notification
 * - Buffer responses over 1000ms
 */
export const notificationsAddDeleteErrorsEpic = (action$: any) =>
  action$.pipe(
    ofType(AssetsActionTypes.DELETE_ERROR),
    bufferTime(1000),
    filter((actions: any) => actions.length > 0),
    mergeMap((actions: any) => {
      const errorCount = actions.length
      return of(
        notificationsAddError({
          title: `Unable to delete ${errorCount} ${pluralize('image', errorCount)}`
        })
      )
    })
  )

/**
 * Listen for asset fetch errors:
 * - Display error notification
 */
export const notificationsAddFetchErrorEpic = (action$: any) =>
  action$.pipe(
    ofType(AssetsActionTypes.FETCH_ERROR),
    mergeMap((action: any) => {
      const error = action.payload?.error
      return of(
        notificationsAddError({
          title: `An error occured: ${error.toString()}`
        })
      )
    })
  )

/**
 * Listen for successful asset updates:
 * - Display success notification
 */

export const notificationAddUpdateEpic = (action$: any) =>
  action$.pipe(
    ofType(AssetsActionTypes.UPDATE_COMPLETE),
    mergeMap(() =>
      of(
        notificationsAddSuccess({
          title: `Image updated`
        })
      )
    )
  )

/**
 * Listen for asset update errors:
 * - Display error notification
 */
export const notificationsAddUpdateErrorEpic = (action$: any) =>
  action$.pipe(
    ofType(AssetsActionTypes.UPDATE_ERROR),
    mergeMap((action: any) => {
      const error = action.payload?.error
      return of(
        notificationsAddError({
          title: `An error occured: ${error.toString()}`
        })
      )
    })
  )