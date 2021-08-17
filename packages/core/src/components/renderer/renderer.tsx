import * as React from 'react'
import type {
  TLShape,
  TLPage,
  TLPageState,
  TLSettings,
  TLCallbacks,
  TLShapeUtils,
  TLTheme,
  TLBounds,
  TLBinding,
} from '../../types'
import { Canvas } from '../canvas'
import { useTLTheme, TLContext } from '../../hooks'

export interface RendererProps<T extends TLShape>
  extends Partial<TLSettings>,
    Partial<TLCallbacks> {
  shapeUtils: TLShapeUtils<T>
  page: TLPage<T, TLBinding>
  pageState: TLPageState
  theme?: Partial<TLTheme>
  hideBounds?: boolean
  hideHandles?: boolean
  hideIndicators?: boolean
}

export function Renderer<T extends TLShape>({
  shapeUtils,
  page,
  pageState,
  theme,
  hideHandles = false,
  hideIndicators = false,
  hideBounds = false,
  ...rest
}: RendererProps<T>): JSX.Element {
  useTLTheme(theme)
  const rScreenBounds = React.useRef<TLBounds>(null)
  const rPageState = React.useRef<TLPageState>(pageState)

  React.useEffect(() => {
    rPageState.current = pageState
  }, [pageState])

  const [context] = React.useState(() => ({
    callbacks: rest,
    shapeUtils,
    rScreenBounds,
    rPageState,
  }))

  return (
    <TLContext.Provider value={context}>
      <Canvas
        page={page}
        pageState={pageState}
        hideBounds={hideBounds}
        hideIndicators={hideIndicators}
        hideHandles={hideHandles}
      />
    </TLContext.Provider>
  )
}