

import Cytosis from 'cytosis'




// tracks input types for item fields
export const INPUT_TYPES = {
  "TEXT":     'TEXT', // input text, generic; default
  "EMAIL":    'EMAIL', // email input
  "NUMBER":   'NUMBER', // number input
  "TEXTAREA": 'TEXTAREA', // text area
  "RADIO":    'RADIO', // radio button group
  "CHECKBOX": 'CHECKBOX', // checkbox group        
}


// export const test = function() {
export async function cytosis(env, store) {

  if(!env || !store) {
    console.error('Initialize cytosis with env and store')
    return;
  }

  let cytosis
  // console.log('Get cytosis; check store: ', store)

  // return a preloaded cytosis to save on data
  if(!store.state.cytosis) {
    console.log('startCytosis: ', env)
    Cytosis.configure({
      airtableApiKey: env.airtable_api,
      airtableBaseId: env.airtable_base,
    });

    // console.log('configured!')
    cytosis = await new Cytosis({
      airtableApiKey: env.airtable_api,
      airtableBaseId: env.airtable_base,
    })

    console.log('Cytosis Loaded:', cytosis)
    // let obj = { cytosis: cytosis, ...tables }
    store.commit('setCytosis', cytosis)
  } else {
    cytosis = store.state.cytosis
  }

  return new Promise(function(resolve, reject) {
    resolve(cytosis)
  })

  // [{data: (tags object), fields: ['Name', 'Notes']}, {data: (people object), fields: ['Name', 'Tags']}]
  // cytosis.join([{'Alpha': {one: '1', two: '2'}}, {'Alpha': {one: '1', two: '2'}}, ], )

  // let testRecord = await cytosis.get('recvV3NDQZCQZ8HHY')
  // console.log('Testing get id:', testRecord)

  // // let saveRecord = await cytosis.save({Name:'Testing!'}, 'Phages')
  // // console.log('Testing save id:', saveRecord)

  // // await cytosis.delete('Phages', 'rec2K9yJV1TLqasI3')

  // let findString = await cytosis.find('Labs.CCRC.Phages.Curator')
  // console.log('Finding string:', findString)

}


