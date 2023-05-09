import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import TaskForm from '@/components/modals/TaskFormModal.vue';
import TaskView from '@/components/modals/TaskViewModal.vue';
import BoardForm from '@/components/modals/BoardFormModal.vue';
import DeleteNode from '@/components/modals/DeleteNodeModal.vue';
import type { Board, Card } from '@/types/types';

type ModalComponent = typeof TaskForm | typeof TaskView | typeof BoardForm | typeof DeleteNode;

export interface ModalsState {
  activeModal: ModalComponent | null;
  modalData: Board | Card | null;
  modalComponentsMap: Record<string, ModalComponent>;
}

export const useModalsStore = defineStore('modals', {
  state: (): ModalsState => ({
    activeModal: null,
    modalData: null,
    modalComponentsMap: {
      TaskForm: markRaw(TaskForm),
      TaskView: markRaw(TaskView),
      BoardForm: markRaw(BoardForm),
      DeleteNode: markRaw(DeleteNode),
    }
  }),

  getters: {
    getModalsStore(): ModalComponent | null {
      return this.activeModal;
    },
    getModalData(): Board | Card | null {
      return this.modalData;
    }
  },

  actions: {
    openModal(modalName: keyof ModalsState['modalComponentsMap'], data: Card | Board) {
      this.activeModal = this.modalComponentsMap[modalName];
      this.modalData = data;
    },

    closeModal() {
      this.activeModal = null;
      this.modalData = null;
    },
  },
});