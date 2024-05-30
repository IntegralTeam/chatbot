import { startApi } from "@/api"

export const dynamic = 'force-dynamic' 

type Params = {
  team: string
}
 
export async function GET(
  request: Request, context: { params: Params }
) {

  const data = await startApi({
    chat_id: "12333"
  })
 
  return Response.json({ data })
}