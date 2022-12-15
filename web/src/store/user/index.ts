const user = {
  state: {
    uid: "",
    name: "",
    add: "",
    edit: "",
    delect: "",
    read: "",
  },
  action: {
    add(state: any, action: {
      uid: string,
      name: string,
      add: string | number,
      edit: string | number,
      delect: string | number,
      read: string | number,
    }) {
      state.name = action.name;
      state.uid = action.uid;
      state.add = action.add;
      state.edit = action.edit;
      state.delect = action.delect;
      state.read = action.read;
    }
  },
  // 异步操作
  asyncAction: {
    // 测试
    test(dispatch: Function) {
      setTimeout(() => dispatch({ type: 'add', val: 'test' }))
    }
  },
  key: { add: "add" }
}

let keyList = {}

for (const key in user.action) {
  keyList[key] = key
}

user.action.key = keyList

export default user