interface LoginInterface {
  code: number;
  data: Data;
  token: string;
  message: string;
}

interface Data {
  uid: string;
  name: string;
  nickName: string;
  add: string | number;
  edit: string | number;
  delect: string | number;
  read: string | number;
}

interface LoginParams {
  uname: string;
  upaw: string;
}


interface EmployeesApi {
  code: number;
  data: EmployeesData;
  message: string;
}

interface EmployeesData {
  data: Datum[];
  page: string;
  limit: string;
  total: number;
}

interface Datum {
  uid: string;
  did: string;
  id: string;
  name: string;
  nickName: string;
  age: number;
  gender: string;
  phone: string;
  bank: string;
  email: string;
  address?: string;
  birth?: string;
  identity?: string;
  role?: string;
  createTime?: string;
  grades?: string;
  desc?: string;
}

interface DepartmentApi {
  name: string,
  did: string,
}

interface EmployeesAddApi {
  name: string;
  uid: string;
  gender: string;
  age: string;
  phone: string;
  email: string;
  birth: string;
  role: string;
  createTime: string;
  grades: string;
}
interface addEmployeesInfoData {
  birth: string;
  createTime: string;
  name: string;
  gender: string;
  phone: string;
  role: string;
  uid?: string;
}

interface addEmployeesInfo {
  code: string | number;
  data: null;
  message: string;
}

interface Employees {
  key: number;
  uid: string;
  did: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  birth: string;
  createTime?: any;
  grades: string;
  role: string;
}

interface delEmployeesInfoData {
  uid: string;
}

interface AttendanceApi {
  data: Datum[];
  page: number;
  limit: number;
  total: number;
}

interface Datum {
  uid: string;
  work_day: string;
  total_day: string;
  over_day: string;
  piece_total: string;
  score: number;
  name: string;
}

interface editAttendanceInfoApi {
  work_day: string | number;
  total_day: string | number;
  over_day: string | number;
  piece_total: string | number;
  score: string | number;
  uid: string | number;
}

interface editAttendanceInfoApi {
  code: number;
  data: null;
  msg: string
}

interface addJobsInfoData {
  role: string;
  grades: number;
  ebase_money: number;
  jbase_money: number;
  perform_money: number;
  live_money: number;
  grow_money: number;
  id?: string;
}