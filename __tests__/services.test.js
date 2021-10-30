import UserList from "../src/services/UserListService"
import CsvDataService from "../src/services/CsvDataService"

describe('UserList() returns data', () => {
  it('should load user data', () => {
    return UserList()
      .then(data => {
        expect(data).toBeDefined()
      })
  })
})

describe('CsvDataService() filters empty rows', () => {
  it('should filter empty rows', () => {
    expect(CsvDataService('test.csv', [{ id: "", name: "" }, { id: "", name: "" }], [1, 2])).toEqual("id,name\n")
  })
})