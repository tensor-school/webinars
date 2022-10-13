const list = [{
    id: 1,
    text: 'first task',
    tags: ['green', 'home']
}, {
    id: 2,
    text: 'second task',
    tags: ['red', 'home']
}, {
    id: 3,
    text: 'third',
    tags: ['blue', 'work']
}, {
    id: 4,
    text: 'fourth task',
    tags: ['black', 'work']
}];
// CRUD Create Read Update Delete
function createTask(newTask, data) {
    const newId = data[data.length - 1].id + 1;
    data.push({
        ...newTask,
        id: newId
    });
}
function readTask(id, data) {
    return data.find((item)=>item.id === id);
}
function deleteTask(id, data) {
    const indexToDelete = data.findIndex((item)=>item.id === id);
    if (indexToDelete === -1) {
        throw 'такого id не существует';
    }
    list.splice(indexToDelete, 1);
}
function updateTask(newData, data) {
    const itemToUpdate = data.find((item)=>item.id === newData.id);
    if (!itemToUpdate) {
        throw `Элемента с таким id - ${newData.id}  не существует`;
    }
    for (props in newData) {
        if (newData.hasOwnProperty(props) && itemToUpdate.hasOwnProperty(props)) {
            itemToUpdate[props] = newData[props];
        }
    }
}
function searchByText(searchString, data) {
    const lowerCaseSearchString = searchString.toLowerCase();
    return data.filter((item)=>item.text.toLowerCase().includes(lowerCaseSearchString));
}
function searchByTags(searchString, data) {
    const lowerCaseSearchString = searchString.toLowerCase();
    return data.filter((item)=>item.tags.includes(lowerCaseSearchString)
    );
}
// createTask({text:'test task one more', tags: ['white']}, list);
// deleteTask(2, list);
// updateTask({
//     id: 4,
//     text: 'newText',
//     tags: ['pink'],
//     sqlEnjection: 'some dangerios string'
// }, list);
console.log(searchByTags('red', list));
// console.log(list);