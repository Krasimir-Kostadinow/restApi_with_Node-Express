const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, course: 'course1' },
    { id: 2, course: 'course2' },
    { id: 3, course: 'course3' },
    { id: 4, course: 'course4' }

];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/course', (req, res) => {
    res.send(courses);
});

app.get('/api/course/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) res.status(404).send('The course with the given ID not found.')
    res.send(course);
});

app.post('/api/course', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        // Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
