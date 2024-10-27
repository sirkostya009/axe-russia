import en from './en.ts';

Object.values(en).filter(obj => typeof obj === 'object' && 'description' in obj).map((obj) => {
	console.log(obj.name);
	console.log(obj.description, '\n');
});
