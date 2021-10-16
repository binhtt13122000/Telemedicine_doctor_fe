import axios from "../../../axios";
import { VideoCall } from "../models/VideoCall.model";

class VideoCallService {
    getVideoCallByHealthCheckId(id: string) {
        return axios.get<VideoCall>(`/health-check/${id}?mode=call`);
    }
}

export default VideoCallService;
