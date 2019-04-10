import { client } from '../../services/rundeckClient'

import {
  getRundeckContext,
  RundeckContext
} from "@rundeck/ui-trellis"

export interface NodeSourceResources {
  href: string
  editPermalink?: string
  writeable: boolean
  description?: string
  syntaxMimeType?:string
  empty?: boolean
}
export interface NodeSource {
  index: number
  type: string
  resources: NodeSourceResources
  errors?:string
}
export async function getProjectNodeSources(): Promise<NodeSource[]> {

  const rundeckContext = getRundeckContext()
  const resp = await client.sendRequest({
    url: `/api/${rundeckContext.apiVersion}/project/${rundeckContext.projectName}/sources`,
    method: 'GET'
  })
  if (!resp.parsedBody) {
    throw new Error(`Error getting node sources list for ${rundeckContext.projectName}`)
  }
  else {
    return resp.parsedBody as NodeSource[]
  }
}
