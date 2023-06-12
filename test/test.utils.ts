export default function createMockInstance<T>(cls: unknown): jest.Mocked<T> {
  const MockedInstance = <jest.Mock<typeof cls>>cls;
  return <jest.Mocked<T>>new MockedInstance();
}
