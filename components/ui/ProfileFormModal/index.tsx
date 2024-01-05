'use client';

import Modal from '@/components/ui/Modal';
import ProfileFormModal from './ProfileFormModal';

export default ({ isModalOpen }: { isModalOpen: boolean }) => {
  return (
    <Modal
      variant="custom"
      isActive={isModalOpen}
      onCancel={() => {}}
      className="max-w-2xl bg-gray-900">
      <ProfileFormModal />
    </Modal>
  );
};
