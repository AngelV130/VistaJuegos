import { SSEConfig } from "@ioc:Adonis/Addons/ServerSentEvent";
import Env from "@ioc:Adonis/Core/Env";

const sseConfig: SSEConfig = {
  /*!
   |--------------------------------------------------
   | No IDs
   |--------------------------------------------------
   |
   | Whether id: field should be included
   | for the text-stream response
   |
   | flag to determine if server-sent events should
   | contain the 'id: xxxx' line
   |
   */
  noIds: false,

  /*!
   |--------------------------------------------------
   | Compress Output
   |--------------------------------------------------
   |
   | Whether the text-stream response should compressed
   | using HTTP compression
   |
   | compress text output for server-sent events
   | HTTP entity body / payload
   |
   */
  compressOutput: false,

  /*!
   |--------------------------------------------------
   | Prefer Event Name
   |--------------------------------------------------
   |
   | Whether the event: field should be included
   | for the text-stream response
   |
   | flag to determine if the `prefered_event_name`
   | should be in server-sent events
   | HTTP entity body / payload
   |
   */
  preferEventName: false,

  /*!
   |--------------------------------------------------
   | Prefered Event Name
   |--------------------------------------------------
   |
   | default event name: 'braodcast'
   |
   |
   */
  preferredEventName: Env.get('SSE_PREFERRED_EVENT_NAME', 'broadcast')

}

export default sseConfig;
