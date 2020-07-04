import { put, select } from 'redux-saga/effects'
import TemperatureActions from '../Redux/TemperatureRedux'
import { is } from 'ramda'

// exported to make available for tests
export const selectTemperature = (state) => state.temperature.temperature

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!

  }
  const temp = yield select(selectTemperature)
  // only fetch new temps when we don't have one yet
  if (!is(Number, temp)) {
    yield put(TemperatureActions.temperatureRequest('San Francisco'))
  }
}
