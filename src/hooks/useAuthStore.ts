import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "@/services";
import { onLogin, onLogout, setRoleUser } from "@/store";

export const useAuthStore = () => {
  const { status, user, roleUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/auth', body);
      console.log(data);
      const user = `${data.user.name} ${data.user.lastName}`;
      const role = data.user.staffs.role;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', user);
      localStorage.setItem('role', JSON.stringify(role));
      dispatch(onLogin(user));
      dispatch(setRoleUser({ role }))
    } catch (error: any) {
      dispatch(onLogout());
      console.log(error.response.data)
      Swal.fire('Oops ocurrio algo', JSON.stringify(error.response.data.detail), 'error');
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = localStorage.getItem('user')
      dispatch(onLogin(user));
      const role = JSON.parse(localStorage.getItem('role')!)
      dispatch(setRoleUser({ role: role }));
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  }



  return {
    //* Propiedades
    status,
    user,
    roleUser,
    //* Métodos
    startLogin,
    checkAuthToken,
    startLogout,
  }

}
