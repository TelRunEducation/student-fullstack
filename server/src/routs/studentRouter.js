import express from "express";
import {
    addScore,
    addStudent,
    findByMinScore,
    findByName,
    findStudent, getStudents,
    updateStudent
} from "../controler/studentControler.js";

export const router = express.Router();

router.get('/student', getStudents)
router.post('/student', addStudent)
router.get('/student/:id', findStudent)
router.delete('/student/:id', findStudent)
router.patch('/student/:id', updateStudent)
router.patch('/score/student/:id', addScore)
router.get('/student/name/:name', findByName)
router.get('/quantity/student/', findStudent)
router.get('/student/exam/:exam/minScore/:minScore', findByMinScore)

export default router;