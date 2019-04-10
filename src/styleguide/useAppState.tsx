import { useState } from 'react'

export interface State {
  activePage: string
}

const useAppState = () => {
  const initialState = {
    activePage: null
  }

  const [state, setState] = useState<State>(initialState)

  const actions = {
    setActivePage(page: string) {
      setState({ ...state, activePage: page })
    }
  }

  return { state, actions }
}

export type Actions = ReturnType<typeof useAppState>['actions']

export default useAppState
