export default {
  state: {
    
  },
  action: {
    open(state: any, val: { uid: string, id: string, name: string }) {
      state.id = val.id;
      state.uid = val.uid;
      state.name = val.name;
    }
  },
  open: "open",
  close:"close"
}