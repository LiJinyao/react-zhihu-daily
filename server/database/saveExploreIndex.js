import query from './sqlHelper';

export default function (item) {
  return new Promise((resolve, reject) => {
    for (const type of item) {
      console.log(type);
    }
  });
}
