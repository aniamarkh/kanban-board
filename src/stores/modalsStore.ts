import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import TaskForm from '@/components/modals/TaskFormModal.vue';
import TaskView from '@/components/modals/TaskViewModal.vue';
import BoardForm from '@/components/modals/BoardFormModal.vue';
import DeleteNode from '@/components/modals/DeleteNodeModal.vue';
import type { ModalData } from '@/types/types';

type ModalComponent = typeof TaskForm | typeof TaskView | typeof BoardForm | typeof DeleteNode;

export interface ModalsState {
  activeModalComponent: ModalComponent | null;
  modalData: ModalData | null;
  modalComponentsMap: Record<string, ModalComponent>;
}

export const useModalsStore = defineStore('modals', {
  state: (): ModalsState => ({
    activeModalComponent: null,
    modalData: null,
    modalComponentsMap: {
      TaskForm: markRaw(TaskForm),
      TaskView: markRaw(TaskView),
      BoardForm: markRaw(BoardForm),
      DeleteNode: markRaw(DeleteNode),
    },
  }),

  getters: {
    getModalsStore(): ModalComponent | null {
      return this.activeModalComponent;
    },
    getModalData(): ModalData | null {
      return this.modalData;
    },
  },

  actions: {
    openModal(modalName: keyof ModalsState['modalComponentsMap'], data: ModalData | null) {
      this.activeModalComponent = this.modalComponentsMap[modalName];
      this.modalData = data;
    },

    closeModal() {
      this.activeModalComponent = null;
      this.modalData = null;
    },
  },
});
