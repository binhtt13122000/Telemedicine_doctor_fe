import axios from "../../../axios";
import { HealthCheck } from "../models/VideoCall.model";

class VideoCallService {
    getVideoCallByHealthCheckId(id: string) {
        return axios.get<HealthCheck>(`/health-checks/${id}`);
    }
}

export default VideoCallService;
