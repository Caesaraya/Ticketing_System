import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

// Confirmation modal shown before actually logging out. Reuses the
// existing AuthContext.logout() — no new auth logic, just a
// confirmation step in front of the call that already existed.
export default function LogoutModal({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    logout();
    onClose();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log out">
      <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
        Are you sure you want to log out of your account?
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm} className="bg-red-600 hover:bg-red-700">
          Logout
        </Button>
      </div>
    </Modal>
  );
}