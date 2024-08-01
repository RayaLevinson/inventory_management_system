const ModuleDescription = require('@database/models/modules/parts/module.description.model')
const ModulePartNumber = require('@database/models/modules/parts/module.pn.model')
const ModuleRevision = require('@database/models/modules/parts/module.revision.model')
const ModuleState = require('@database/models/modules/parts/module.state.model')
const ModuleStatus = require('@database/models/modules/parts/module.status.model')
const AppError = require('@utils/appError.util')

const fetchAllData = async (list) => {
  const checkFoundValues = (requested, found, type) => {
    const foundNames = found.map((item) => item.name)
    const missing = requested.filter((name) => !foundNames.includes(name))
    if (missing.length > 0) {
      throw new AppError(`Missing ${type}: ${missing.join(', ')}`, 404)
    }
  }

  const descriptions = await ModuleDescription.find({
    name: { $in: list.map((item) => item.description_id).filter(Boolean) }
  })
  checkFoundValues(list.map((item) => item.description_id).filter(Boolean), descriptions, 'Descriptions')

  const pns = await ModulePartNumber.find({
    name: { $in: list.map((item) => item.pn_id).filter(Boolean) }
  })
  checkFoundValues(list.map((item) => item.pn_id).filter(Boolean), pns, 'PNs')

  const status = await ModuleStatus.find({
    name: { $in: list.map((item) => item.status_id).filter(Boolean) }
  })
  checkFoundValues(list.map((item) => item.status_id).filter(Boolean), status, 'Statuses')

  const revisions = await ModuleRevision.find({
    name: { $in: list.map((item) => item.revision_id).filter(Boolean) }
  })
  checkFoundValues(list.map((item) => item.revision_id).filter(Boolean), revisions, 'Revisions')

  const states = await ModuleState.find({
    name: { $in: list.map((item) => item.state_id).filter(Boolean) }
  })
  checkFoundValues(list.map((item) => item.state_id).filter(Boolean), states, 'States')

  return {
    descriptions,
    pns,
    status,
    revisions,
    states
  }
}

const mapDataToItems = (list, data) => {
  const { descriptions, pns, status, revisions, states } = data

  const stateMap = Object.fromEntries(states.map((item) => [item.name, item._id]))
  const statusMap = Object.fromEntries(status.map((item) => [item.name, item._id]))
  const pnMap = Object.fromEntries(pns.map((item) => [item.name, item._id]))
  const revisionMap = Object.fromEntries(revisions.map((item) => [item.name, item._id]))
  const descriptionMap = Object.fromEntries(descriptions.map((item) => [item.name, item._id]))

  return list.map((module) => {
    const item = { ...module }

    if (item.state_id) {
      if (!stateMap[item.state_id]) {
        throw new AppError(`State not found: ${item.state_id}`, 404)
      }
      item.state_id = stateMap[item.state_id]
    }
    if (item.status_id) {
      if (!statusMap[item.status_id]) {
        throw new AppError(`Status not found: ${item.status_id}`, 404)
      }
      item.status_id = statusMap[item.status_id]
    }
    if (item.pn_id) {
      if (!pnMap[item.pn_id]) {
        throw new AppError(`PN not found: ${item.pn_id}`, 404)
      }
      item.pn_id = pnMap[item.pn_id]
    }
    if (item.revision_id) {
      if (!revisionMap[item.revision_id]) {
        throw new AppError(`Revision not found: ${item.revision_id}`, 404)
      }
      item.revision_id = revisionMap[item.revision_id]
    }
    if (item.description_id) {
      if (!descriptionMap[item.description_id]) {
        throw new AppError(`Description not found: ${item.description_id}`, 404)
      }
      item.description_id = descriptionMap[item.description_id]
    }
    if (item.date) item.date = new Date(item.date)
    return item
  })
}

const processData = async (list) => {
  const data = await fetchAllData(list)
  return mapDataToItems(list, data)
}
module.exports = { processData }
