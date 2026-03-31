import { create } from 'zustand';

const useStore = create((set) => ({
  measurements: {
    chest: 100, // this is the default value for ranging from 80 to 130
  },
  setChest: (value) =>
    set((state) => ({
      measurements: { ...state.measurements, chest: value },
    })),
}));

export default useStore;