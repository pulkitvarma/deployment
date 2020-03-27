import axios from 'axios';
import { environment } from './environment';

class HttpService {
    instance = axios.create({
        baseURL: `${environment.SCHEME}://${environment.BASE_URL}/${environment.path}/${environment.version}/${environment.controller}/`,
    })

    login(email: string, password: string) {
        let body = {
            email: email,
            password: password
        }
        return this.instance.post(`login`, body);
    }

    forgotPassword(email: string) {
        return this.instance.post(`forgot-password`, email);
    }
    resetPassword(reset_id: string, password: string) {
        let body = {
            passwordResetToken: reset_id,
            newPassword: password
        }
        return this.instance.post('reset-password', body)
    }

}

export default HttpService