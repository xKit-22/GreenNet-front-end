import { updateUser } from '../Methods/UserMethods';

export const ActivationPage = () => {
    const arr = window.location.pathname.split('/');
    const currentUserId = arr[arr.length - 1];

    const activateUser = async () => {
        const data = {
            activation: true
        };

        updateUser(currentUserId, data);
    };

    activateUser();
    return (
        <h1>Поздравляю! страница активирована!</h1>
    )
}