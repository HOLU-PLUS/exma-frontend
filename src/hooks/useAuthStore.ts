import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { onLogin, onLoginCustomer, onLogout, setRoleUser } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useAuthStore = () => {
  const { status, user, roleUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess } = useAlertStore();
  const { showInput } = useAlertStore();

  const authAdministrator = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/auth', body);
      console.log(data);
      const user = `${data.user.name} ${data.user.lastName}`;
      const role = data.user.staff.role;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', user);
      localStorage.setItem('role', JSON.stringify(role));
      dispatch(onLogin(user));
      dispatch(setRoleUser({ role }));
    } catch (error) {
      dispatch(onLogout());
      throw handleError(error);
    }
  };
  const authGuest = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/auth/guest/', body);
      console.log(data);
      if (data.statusCode == 1) return inputCodeValidation(data);
      const user = `${data.user.name} ${data.user.lastName}`;
      const qr = data.user.guest.codeQr;
      localStorage.setItem('tokenCustomer', data.token);
      localStorage.setItem('user', user);
      localStorage.setItem('qr', qr);
      dispatch(onLoginCustomer(user));
    } catch (error) {
      throw handleError(error);
    }
  };

  const registerGuest = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/guest/', body);
      console.log(data);
      if (data.statusCode == 1) return inputCodeValidation(data);
      showSuccess('Invitado creado correctamente');
    } catch (error: any) {
      throw handleError(error);
    }
  };

  const inputCodeValidation = async (data: any) => {
    localStorage.setItem('tokenAux', data.token);
    const code: string = await showInput(data.title);
    const body = { code };
    try {
      const { data } = await coffeApi.post('auth/validate-email', body);
      console.log(data);
      localStorage.removeItem('tokenAux');
      showSuccess(data.message);
    } catch (error) {
      throw handleError(error);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = localStorage.getItem('user');
      dispatch(onLogin(user));
      const role = JSON.parse(localStorage.getItem('role')!);
      dispatch(setRoleUser({ role: role }));
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    status,
    user,
    roleUser,
    //* Métodos
    authAdministrator,
    authGuest,
    registerGuest,
    checkAuthToken,
  };
};

export const useLogoutStore = () => {
  const dispatch = useDispatch();
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };
  return {
    startLogout,
  };
};
