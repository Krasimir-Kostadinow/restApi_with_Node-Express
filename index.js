const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' }

];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/course', (req, res) => {
    res.send(courses);
});

app.get('/api/course/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found.')
    res.send(course);
});

app.post('/api/course', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/course/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found.');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
 
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/course/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return result = Joi.validate(course, schema);
}