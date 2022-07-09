declare global {
  interface PluginPoints {}
}
type PluginPoint = keyof PluginPoints

const contributions: { [k in PluginPoint]?: PluginPoints[k][] } = {}

export default function plugins<k extends PluginPoint>(
  point: k
): PluginPoints[k][] {
  return contributions[point] ?? []
}

plugins.register = function <P extends PluginPoint>(
  point: P,
  contribution: PluginPoints[P]
) {
  ;(contributions[point] ??= [] as any[]).push(contribution)
}
;(globalThis as any).plugins = plugins
