export const end_point = 'http://localhost:5000'
export const all_items = () => end_point + '/items/'
export const single_item = (item_id) => all_items() + `${item_id}`