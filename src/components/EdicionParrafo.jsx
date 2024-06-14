import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';
import Stack from '@mui/material/Stack';
import '../styles/SelectMultipleAR.css';

const listadoSubjectDat = [
    { id_materia: 149, id_carrera: 5, anio: 1 },
    { id_materia: 152, id_carrera: 5, anio: 1 },
    { id_materia: 151, id_carrera: 5, anio: 1 },
    { id_materia: 443, id_carrera: 5, anio: 1 },
    { id_materia: 153, id_carrera: 5, anio: 1 },
    { id_materia: 160, id_carrera: 5, anio: 1 },
    { id_materia: 444, id_carrera: 5, anio: 1 },
    { id_materia: 149, id_carrera: 31, anio: 1 },
    { id_materia: 152, id_carrera: 31, anio: 1 },
    { id_materia: 151, id_carrera: 31, anio: 1 },
    { id_materia: 150, id_carrera: 31, anio: 1 },
    { id_materia: 153, id_carrera: 31, anio: 1 },
    { id_materia: 160, id_carrera: 31, anio: 1 },
    { id_materia: 444, id_carrera: 31, anio: 1 },
    { id_materia: 41, id_carrera: 31, anio: 1 },


    /* ***********************************************************************
     * Enfermer�a 
     */
    { id_materia: 123, id_carrera: 6, anio: 1, campo: "CFB1" },
    { id_materia: 124, id_carrera: 6, anio: 1, campo: "CFB1" },
    { id_materia: 129, id_carrera: 6, anio: 1, campo: "CFE1" },
    { id_materia: 125, id_carrera: 6, anio: 1, campo: "CFB1" },
    { id_materia: 222, id_carrera: 6, anio: 1, campo: "CFB1" },
    { id_materia: 141, id_carrera: 6, anio: 1, campo: "CFE1" },
    { id_materia: 131, id_carrera: 6, anio: 1, campo: "CFE1" },
    { id_materia: 4, id_carrera: 6, anio: 1 },
    { id_materia: 126, id_carrera: 6, anio: 2, campo: "CFB1" },
    { id_materia: 133, id_carrera: 6, anio: 2, campo: "CFE1" },
    { id_materia: 139, id_carrera: 6, anio: 2, campo: "CFE1" },
    { id_materia: 225, id_carrera: 6, anio: 2, campo: "CFE1" },
    { id_materia: 130, id_carrera: 6, anio: 2, campo: "CFB1" },
    { id_materia: 223, id_carrera: 6, anio: 2, campo: "CFB1" },
    { id_materia: 132, id_carrera: 6, anio: 2, campo: "CFE1" },
    { id_materia: 31, id_carrera: 6, anio: 2 },
    { id_materia: 221, id_carrera: 6, anio: 3, campo: "CFB1" },
    { id_materia: 135, id_carrera: 6, anio: 3, campo: "CFE1" },
    { id_materia: 140, id_carrera: 6, anio: 3, campo: "CFB1" },
    { id_materia: 134, id_carrera: 6, anio: 3, campo: "CFE1" },
    { id_materia: 137, id_carrera: 6, anio: 3, campo: "CFB1" },
    { id_materia: 142, id_carrera: 6, anio: 3, campo: "CFE1" },
    { id_materia: 226, id_carrera: 6, anio: 3, campo: "CFE1" },
    { id_materia: 224, id_carrera: 6, anio: 3, campo: "CFB1" },
    { id_materia: 128, id_carrera: 6, anio: 3, campo: "CFE1" },
    { id_materia: 227, id_carrera: 6, anio: 3 },

    { id_materia: 123, id_carrera: 34, anio: 1, campo: "CFB1" },
    { id_materia: 124, id_carrera: 34, anio: 1, campo: "CFB1" },
    { id_materia: 129, id_carrera: 34, anio: 1, campo: "CFE1" },
    { id_materia: 125, id_carrera: 34, anio: 1, campo: "CFB1" },
    { id_materia: 222, id_carrera: 34, anio: 1, campo: "CFB1" },
    { id_materia: 141, id_carrera: 34, anio: 1, campo: "CFE1" },
    { id_materia: 131, id_carrera: 34, anio: 1, campo: "CFE1" },
    { id_materia: 4, id_carrera: 34, anio: 1 },
    { id_materia: 126, id_carrera: 34, anio: 2, campo: "CFB1" },
    { id_materia: 133, id_carrera: 34, anio: 2, campo: "CFE1" },
    { id_materia: 139, id_carrera: 34, anio: 2, campo: "CFE1" },
    { id_materia: 225, id_carrera: 34, anio: 2, campo: "CFE1" },
    { id_materia: 130, id_carrera: 34, anio: 2, campo: "CFB1" },
    { id_materia: 223, id_carrera: 34, anio: 2, campo: "CFB1" },
    { id_materia: 132, id_carrera: 34, anio: 2, campo: "CFE1" },
    { id_materia: 31, id_carrera: 34, anio: 2 },
    { id_materia: 221, id_carrera: 34, anio: 3, campo: "CFB1" },
    { id_materia: 135, id_carrera: 34, anio: 3, campo: "CFE1" },
    { id_materia: 140, id_carrera: 34, anio: 3, campo: "CFB1" },
    { id_materia: 134, id_carrera: 34, anio: 3, campo: "CFE1" },
    { id_materia: 137, id_carrera: 34, anio: 3, campo: "CFB1" },
    { id_materia: 142, id_carrera: 34, anio: 3, campo: "CFE1" },
    { id_materia: 226, id_carrera: 34, anio: 3, campo: "CFE1" },
    { id_materia: 224, id_carrera: 34, anio: 3, campo: "CFB1" },
    { id_materia: 128, id_carrera: 34, anio: 3, campo: "CFE1" },
    { id_materia: 227, id_carrera: 34, anio: 3 },
    { id_materia: 687, id_carrera: 34, anio: 4 },
    { id_materia: 474, id_carrera: 34, anio: 4, campo: "CFB2" },
    { id_materia: 696, id_carrera: 34, anio: 4 },
    { id_materia: 693, id_carrera: 34, anio: 4, campo: "CFE2" },
    { id_materia: 689, id_carrera: 34, anio: 4, campo: "CFE2" },
    { id_materia: 685, id_carrera: 34, anio: 4, campo: "CFB2" },
    { id_materia: 44, id_carrera: 34, anio: 4 },
    { id_materia: 691, id_carrera: 34, anio: 5, campo: "CFE2" },
    { id_materia: 692, id_carrera: 34, anio: 5, campo: "CFE2" },
    { id_materia: 690, id_carrera: 34, anio: 5, campo: "CFE2" },
    { id_materia: 684, id_carrera: 34, anio: 5 },
    { id_materia: 695, id_carrera: 34, anio: 5 },


    /* ***********************************************************************
     * Biotecnolog�a
     */
    { id_materia: 149, id_carrera: 13, anio: 1, campo: "CFB1" },
    { id_materia: 203, id_carrera: 13, anio: 1, campo: "CIC1" },
    { id_materia: 4, id_carrera: 13, anio: 1, campo: "CFC1" },
    { id_materia: 195, id_carrera: 13, anio: 1, campo: "CFB1" },
    { id_materia: 196, id_carrera: 13, anio: 1, campo: "CFB1" },
    { id_materia: 348, id_carrera: 13, anio: 1, campo: "CFB1" },
    { id_materia: 31, id_carrera: 13, anio: 1, campo: "CFC1" },
    { id_materia: 416, id_carrera: 13, anio: 1, campo: "CIC1" },
    { id_materia: 198, id_carrera: 13, anio: 2, campo: "CFB1" },
    { id_materia: 154, id_carrera: 13, anio: 2, campo: "CFB1" },
    { id_materia: 199, id_carrera: 13, anio: 2, campo: "CFB1" },
    { id_materia: 415, id_carrera: 13, anio: 2, campo: "CFE1" },
    { id_materia: 200, id_carrera: 13, anio: 2, campo: "CFB1" },
    { id_materia: 417, id_carrera: 13, anio: 2, campo: "CIC1" },
    { id_materia: 208, id_carrera: 13, anio: 2, campo: "CIC1" },
    { id_materia: 197, id_carrera: 13, anio: 2, campo: "CFE1" },
    { id_materia: 205, id_carrera: 13, anio: 3, campo: "CFE1" },
    { id_materia: 211, id_carrera: 13, anio: 3, campo: "CIC1" },
    { id_materia: 201, id_carrera: 13, anio: 3, campo: "CFB1" },
    { id_materia: 204, id_carrera: 13, anio: 3, campo: "CFE1" },
    { id_materia: 357, id_carrera: 13, anio: 3, campo: "CFB1" },
    { id_materia: 418, id_carrera: 13, anio: 3, campo: "CIC1" },
    { id_materia: 210, id_carrera: 13, anio: 3, campo: "CFB1" },
    { id_materia: 263, id_carrera: 13, anio: 3, campo: "CFE1" },
    { id_materia: 41, id_carrera: 13, anio: 4, campo: "CFC2" },
    { id_materia: 396, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 397, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 398, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 399, id_carrera: 13, anio: 4, campo: "CIC2" },
    { id_materia: 400, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 401, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 402, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 403, id_carrera: 13, anio: 4, campo: "CFE2" },
    { id_materia: 680, id_carrera: 13, anio: 5, campo: "CFE2" },
    { id_materia: 405, id_carrera: 13, anio: 5, campo: "CFE2" },
    { id_materia: 406, id_carrera: 13, anio: 5, campo: "CFE2" },
    { id_materia: 407, id_carrera: 13, anio: 5, campo: "CIC2" },
    { id_materia: 209, id_carrera: 13, anio: 5, campo: "CIC2" },
    { id_materia: 44, id_carrera: 13, anio: 5, campo: "CFC2" },
    { id_materia: 408, id_carrera: 13, anio: 5, campo: "CFE2" },
    { id_materia: 409, id_carrera: 13, anio: 5, campo: "CIC2" },
    { id_materia: 410, id_carrera: 13, anio: 5, campo: "CFE2" },
    { id_materia: 367, id_carrera: 13, anio: 5, campo: "CIC2" },

    { id_materia: 149, id_carrera: 7, anio: 1, campo: "CFB1" },
    { id_materia: 203, id_carrera: 7, anio: 1, campo: "CIC1" },
    { id_materia: 4, id_carrera: 7, anio: 1, campo: "CFC1" },
    { id_materia: 195, id_carrera: 7, anio: 1, campo: "CFB1" },
    { id_materia: 196, id_carrera: 7, anio: 1, campo: "CFB1" },
    { id_materia: 348, id_carrera: 7, anio: 1, campo: "CFB1" },
    { id_materia: 31, id_carrera: 7, anio: 1, campo: "CFC1" },
    { id_materia: 416, id_carrera: 7, anio: 1, campo: "CIC1" },
    { id_materia: 198, id_carrera: 7, anio: 2, campo: "CFB1" },
    { id_materia: 154, id_carrera: 7, anio: 2, campo: "CFB1" },
    { id_materia: 199, id_carrera: 7, anio: 2, campo: "CFB1" },
    { id_materia: 415, id_carrera: 7, anio: 2, campo: "CFE1" },
    { id_materia: 200, id_carrera: 7, anio: 2, campo: "CFB1" },
    { id_materia: 417, id_carrera: 7, anio: 2, campo: "CIC1" },
    { id_materia: 208, id_carrera: 7, anio: 2, campo: "CIC1" },
    { id_materia: 197, id_carrera: 7, anio: 2, campo: "CFE1" },
    { id_materia: 205, id_carrera: 7, anio: 3, campo: "CFE1" },
    { id_materia: 211, id_carrera: 7, anio: 3, campo: "CIC1" },
    { id_materia: 201, id_carrera: 7, anio: 3, campo: "CFB1" },
    { id_materia: 204, id_carrera: 7, anio: 3, campo: "CFE1" },
    { id_materia: 357, id_carrera: 7, anio: 3, campo: "CFB1" },
    { id_materia: 418, id_carrera: 7, anio: 3, campo: "CIC1" },
    { id_materia: 210, id_carrera: 7, anio: 3, campo: "CFB1" },
    { id_materia: 263, id_carrera: 7, anio: 3, campo: "CFE1" },


    /* ***********************************************************************
     * Profesorado educaci�n f�sica
     */
    { id_materia: 1, id_carrera: 1, anio: 1 },
    { id_materia: 2, id_carrera: 1, anio: 1 },
    { id_materia: 6, id_carrera: 1, anio: 1 },
    { id_materia: 4, id_carrera: 1, anio: 1 },
    { id_materia: 22, id_carrera: 1, anio: 1 },
    { id_materia: 8, id_carrera: 1, anio: 1 },
    { id_materia: 9, id_carrera: 1, anio: 1 },
    { id_materia: 10, id_carrera: 1, anio: 1 },
    { id_materia: 12, id_carrera: 1, anio: 1 },
    { id_materia: 52, id_carrera: 1, anio: 1 },
    { id_materia: 13, id_carrera: 1, anio: 2 },
    { id_materia: 14, id_carrera: 1, anio: 2 },
    { id_materia: 15, id_carrera: 1, anio: 2 },
    { id_materia: 16, id_carrera: 1, anio: 2 },
    { id_materia: 18, id_carrera: 1, anio: 2 },
    { id_materia: 7, id_carrera: 1, anio: 2 },
    { id_materia: 19, id_carrera: 1, anio: 2 },
    { id_materia: 20, id_carrera: 1, anio: 2 },
    { id_materia: 21, id_carrera: 1, anio: 2 },
    { id_materia: 25, id_carrera: 1, anio: 2 },
    { id_materia: 23, id_carrera: 1, anio: 2 },
    { id_materia: 24, id_carrera: 1, anio: 3 },
    { id_materia: 17, id_carrera: 1, anio: 3 },
    { id_materia: 26, id_carrera: 1, anio: 3 },
    { id_materia: 27, id_carrera: 1, anio: 3 },
    { id_materia: 28, id_carrera: 1, anio: 3 },
    { id_materia: 29, id_carrera: 1, anio: 3 },
    { id_materia: 30, id_carrera: 1, anio: 3 },
    { id_materia: 31, id_carrera: 1, anio: 3 },
    { id_materia: 32, id_carrera: 1, anio: 3 },
    { id_materia: 34, id_carrera: 1, anio: 3 },
    { id_materia: 33, id_carrera: 1, anio: 3 },
    { id_materia: 35, id_carrera: 1, anio: 3 },
    { id_materia: 50, id_carrera: 1, anio: 3 },
    { id_materia: 37, id_carrera: 1, anio: 4 },
    { id_materia: 38, id_carrera: 1, anio: 4 },
    { id_materia: 39, id_carrera: 1, anio: 4 },
    { id_materia: 40, id_carrera: 1, anio: 4 },
    { id_materia: 41, id_carrera: 1, anio: 4 },
    { id_materia: 219, id_carrera: 1, anio: 4 },
    { id_materia: 47, id_carrera: 1, anio: 4 },
    { id_materia: 44, id_carrera: 1, anio: 4 },
    { id_materia: 46, id_carrera: 1, anio: 4 },
    { id_materia: 48, id_carrera: 1, anio: 4 },
    { id_materia: 49, id_carrera: 1, anio: 4 },
    { id_materia: 51, id_carrera: 1, anio: 4 },


    /* ***********************************************************************
     * Kinesiolog�a
     */
    { id_materia: 123, id_carrera: 16, anio: 1 },
    { id_materia: 4, id_carrera: 16, anio: 1 },
    { id_materia: 124, id_carrera: 16, anio: 1 },
    { id_materia: 478, id_carrera: 16, anio: 1 },
    { id_materia: 476, id_carrera: 16, anio: 1 },
    { id_materia: 222, id_carrera: 16, anio: 1 },
    { id_materia: 479, id_carrera: 16, anio: 1 },
    { id_materia: 475, id_carrera: 16, anio: 2 },
    { id_materia: 223, id_carrera: 16, anio: 2 },
    { id_materia: 130, id_carrera: 16, anio: 2 },
    { id_materia: 482, id_carrera: 16, anio: 2 },
    { id_materia: 140, id_carrera: 16, anio: 2 },
    { id_materia: 472, id_carrera: 16, anio: 2 },
    { id_materia: 480, id_carrera: 16, anio: 2 },
    { id_materia: 477, id_carrera: 16, anio: 2 },
    { id_materia: 125, id_carrera: 16, anio: 2 },
    { id_materia: 485, id_carrera: 16, anio: 2 },
    { id_materia: 31, id_carrera: 16, anio: 2 },
    { id_materia: 483, id_carrera: 16, anio: 2 },
    { id_materia: 488, id_carrera: 16, anio: 3 },
    { id_materia: 492, id_carrera: 16, anio: 3 },
    { id_materia: 486, id_carrera: 16, anio: 3 },
    { id_materia: 481, id_carrera: 16, anio: 3 },
    { id_materia: 136, id_carrera: 16, anio: 3 },
    { id_materia: 41, id_carrera: 16, anio: 3 },
    { id_materia: 474, id_carrera: 16, anio: 3 },
    { id_materia: 44, id_carrera: 16, anio: 3 },
    { id_materia: 126, id_carrera: 16, anio: 3 },
    { id_materia: 221, id_carrera: 16, anio: 3 },
    { id_materia: 487, id_carrera: 16, anio: 4 },
    { id_materia: 489, id_carrera: 16, anio: 4 },
    { id_materia: 494, id_carrera: 16, anio: 4 },
    { id_materia: 507, id_carrera: 16, anio: 4 },
    { id_materia: 493, id_carrera: 16, anio: 4 },
    { id_materia: 484, id_carrera: 16, anio: 4 },
    { id_materia: 497, id_carrera: 16, anio: 4 },
    { id_materia: 498, id_carrera: 16, anio: 4 },
    { id_materia: 499, id_carrera: 16, anio: 4 },
    { id_materia: 490, id_carrera: 16, anio: 5 },
    { id_materia: 501, id_carrera: 16, anio: 5 },
    { id_materia: 502, id_carrera: 16, anio: 5 },
    { id_materia: 473, id_carrera: 16, anio: 5 },
    { id_materia: 224, id_carrera: 16, anio: 5 },
    { id_materia: 500, id_carrera: 16, anio: 5 },
    { id_materia: 495, id_carrera: 16, anio: 5 },
    { id_materia: 491, id_carrera: 16, anio: 5 },
    { id_materia: 135, id_carrera: 16, anio: 5 },


    /* ***********************************************************************
     * Inform�tica
     *  Se cambian de 3 a 4 anio las siguientes materias
     *     An�lisis Matem�tico(725)
     *     L�gica y Programaci�n (726)  
     *     Matem�tica III (728)
     *  de esa forma no se las sugiera a quienes tienen pendientes de la Tecnicatura
     */
    { id_materia: 545, id_carrera: 38, anio: 1, campo: "CB, " },
    { id_materia: 580, id_carrera: 38, anio: 1, campo: "AYL" },
    { id_materia: 546, id_carrera: 38, anio: 1, campo: "ASOYR" },
    { id_materia: 4, id_carrera: 38, anio: 1, campo: 'Gral' },
    { id_materia: 547, id_carrera: 38, anio: 1, campo: "TC" },
    { id_materia: 549, id_carrera: 38, anio: 1, campo: "AYL" },
    { id_materia: 550, id_carrera: 38, anio: 1, campo: "ISBDYSI" },
    { id_materia: 31, id_carrera: 38, anio: 1, campo: 'Gral' },
    { id_materia: 551, id_carrera: 38, anio: 2, campo: "CB" },
    { id_materia: 578, id_carrera: 38, anio: 2, campo: "AYL" },
    { id_materia: 553, id_carrera: 38, anio: 2, campo: "ASOYR" },
    { id_materia: 554, id_carrera: 38, anio: 2, campo: "ASOYR" },
    { id_materia: 555, id_carrera: 38, anio: 2, campo: "ISBDYSI" },
    { id_materia: 724, id_carrera: 38, anio: 2 },
    { id_materia: 557, id_carrera: 38, anio: 2, campo: "ISBDYSI" },
    { id_materia: 559, id_carrera: 38, anio: 2, campo: "AYL" },
    { id_materia: 560, id_carrera: 38, anio: 2, campo: "ASOYR" },
    { id_materia: 558, id_carrera: 38, anio: 3, campo: "ISBDYSI" },
    { id_materia: 579, id_carrera: 38, anio: 3, campo: "AYL" },
    { id_materia: 44, id_carrera: 38, anio: 3, campo: 'Gral' },
    { id_materia: 561, id_carrera: 38, anio: 3, campo: "ISBDYSI" },
    /* { id_materia: 725, id_carrera: 38, anio: 3 },*/
    { id_materia: 725, id_carrera: 38, anio: 4 },
    /* { id_materia: 726, id_carrera: 38, anio: 3 },*/
    { id_materia: 726, id_carrera: 38, anio: 4 },
    { id_materia: 727, id_carrera: 38, anio: 3 },
    /* { id_materia: 728, id_carrera: 38, anio: 3 },*/
    { id_materia: 728, id_carrera: 38, anio: 4 },
    { id_materia: 729, id_carrera: 38, anio: 3 },
    { id_materia: 562, id_carrera: 38, anio: 4 },

    { id_materia: 545, id_carrera: 21, anio: 1, campo: "CB" },
    { id_materia: 580, id_carrera: 21, anio: 1, campo: "AYL" },
    { id_materia: 546, id_carrera: 21, anio: 1, campo: "ASOYR" },
    { id_materia: 4, id_carrera: 21, anio: 1, campo: 'Gral' },
    { id_materia: 547, id_carrera: 21, anio: 1, campo: "TC" },
    { id_materia: 549, id_carrera: 21, anio: 1, campo: "AYL" },
    { id_materia: 550, id_carrera: 21, anio: 1, campo: "ISBDYSI" },
    { id_materia: 31, id_carrera: 21, anio: 1, campo: 'Gral' },

    { id_materia: 551, id_carrera: 21, anio: 2, campo: "CB" },
    { id_materia: 578, id_carrera: 21, anio: 2, campo: "AYL" },
    { id_materia: 553, id_carrera: 21, anio: 2, campo: "ASOYR" },
    { id_materia: 554, id_carrera: 21, anio: 2, campo: "ASOYR" },
    { id_materia: 555, id_carrera: 21, anio: 2, campo: "ISBDYSI" },
    { id_materia: 579, id_carrera: 21, anio: 2, campo: "AYL" },
    { id_materia: 557, id_carrera: 21, anio: 2, campo: "ISBDYSI" },
    { id_materia: 558, id_carrera: 21, anio: 2, campo: "ISBDYSI" },
    { id_materia: 44, id_carrera: 21, anio: 2, campo: 'Gral' },

    { id_materia: 559, id_carrera: 21, anio: 3, campo: "AYL" },
    { id_materia: 560, id_carrera: 21, anio: 3, campo: "ASOYR" },
    { id_materia: 561, id_carrera: 21, anio: 3, campo: "ISBDYSI" },
    { id_materia: 562, id_carrera: 21, anio: 3 },

    { id_materia: 563, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 564, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 565, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 566, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 567, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 568, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 569, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 571, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 572, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 573, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 574, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 575, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 724, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 725, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 726, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 727, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 729, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 745, id_carrera: 21, anio: 3, campo: "COMP" },
    { id_materia: 746, id_carrera: 21, anio: 3, campo: "COMP" },

    /* ***********************************************************************
     * Dise�o industrial - carrera 39
     */

    { id_carrera: 39, id_materia: 4, anio: 1, campo: "CFB" },
    { id_carrera: 39, id_materia: 31, anio: 1, campo: "CFC" },
    { id_carrera: 39, id_materia: 228, anio: 1, campo: "CFC" },
    { id_carrera: 39, id_materia: 230, anio: 1, campo: "CFC" },
    { id_carrera: 39, id_materia: 232, anio: 1, campo: "CFB" },
    { id_carrera: 39, id_materia: 233, anio: 1, campo: "CFB" },
    { id_carrera: 39, id_materia: 244, anio: 1, campo: "CFE" },
    { id_carrera: 39, id_materia: 795, anio: 1, campo: "CFB" },
    { id_carrera: 39, id_materia: 807, anio: 1, campo: "CFB" },
    { id_carrera: 39, id_materia: 44, anio: 2, campo: "CFC" },
    { id_carrera: 39, id_materia: 234, anio: 2, campo: "CFB" },
    { id_carrera: 39, id_materia: 235, anio: 2, campo: "CFE" },
    { id_carrera: 39, id_materia: 236, anio: 2, campo: "CFE" },
    { id_carrera: 39, id_materia: 237, anio: 2, campo: "CFB" },
    { id_carrera: 39, id_materia: 238, anio: 2, campo: "CFE" },
    { id_carrera: 39, id_materia: 239, anio: 2, campo: "CFE" },
    { id_carrera: 39, id_materia: 240, anio: 2, campo: "CFE" },
    { id_carrera: 39, id_materia: 247, anio: 2, campo: "CFE" },
    { id_carrera: 39, id_materia: 241, anio: 3, campo: "CFE" },
    { id_carrera: 39, id_materia: 242, anio: 3, campo: "CIC" },
    { id_carrera: 39, id_materia: 243, anio: 3, campo: "CFB" },
    { id_carrera: 39, id_materia: 245, anio: 3, campo: "CIC" },
    { id_carrera: 39, id_materia: 246, anio: 3, campo: "CFE" },
    { id_carrera: 39, id_materia: 248, anio: 3, campo: "CIC" },
    { id_carrera: 39, id_materia: 249, anio: 3, campo: "CIC" },
    { id_carrera: 39, id_materia: 255, anio: 3, campo: "CFE" },
    { id_carrera: 39, id_materia: 766, anio: 4, campo: "CIC" },
    { id_carrera: 39, id_materia: 767, anio: 4, campo: "CIC" },
    { id_carrera: 39, id_materia: 768, anio: 4, campo: "CFB" },
    { id_carrera: 39, id_materia: 769, anio: 4, campo: "CFE" },
    { id_carrera: 39, id_materia: 770, anio: 4, campo: "CIC" },
    { id_carrera: 39, id_materia: 771, anio: 4, campo: "CIC" },
    { id_carrera: 39, id_materia: 772, anio: 4, campo: "CFB" },
    { id_carrera: 39, id_materia: 773, anio: 4, campo: "CFB" },
    { id_carrera: 39, id_materia: 774, anio: 5, campo: "CIC" },
    { id_carrera: 39, id_materia: 775, anio: 5, campo: "CFE" },
    { id_carrera: 39, id_materia: 776, anio: 5, campo: "CFE" },
    { id_carrera: 39, id_materia: 777, anio: 5, campo: "CFE" },
    { id_carrera: 39, id_materia: 778, anio: 5, campo: "CIC" },
    { id_carrera: 39, id_materia: 779, anio: 5, campo: "CFE" },
    { id_carrera: 39, id_materia: 780, anio: 5, campo: "CFB" },

    /* ***********************************************************************
     * Obstetricia - carrera 53
     */

    { id_carrera: 53, id_materia: 4, anio: 1, campo: "CFC" },
    { id_carrera: 53, id_materia: 917, anio: 1, campo: "CFE" },
    { id_carrera: 53, id_materia: 918, anio: 1, campo: "CFE" },
    { id_carrera: 53, id_materia: 919, anio: 1, campo: "CFE" },
    { id_carrera: 53, id_materia: 920, anio: 1, campo: "CFE" },
    { id_carrera: 53, id_materia: 921, anio: 1, campo: "CFE" },
    { id_carrera: 53, id_materia: 123, anio: 1, campo: "CFB" },
    { id_carrera: 53, id_materia: 124, anio: 1, campo: "CFB" },
    { id_carrera: 53, id_materia: 222, anio: 1, campo: "CFB" },
    { id_carrera: 53, id_materia: 130, anio: 1, campo: "CFB" },
    { id_carrera: 53, id_materia: 31, anio: 2, campo: "CFC" },
    { id_carrera: 53, id_materia: 922, anio: 2, campo: "CFE" },
    { id_carrera: 53, id_materia: 923, anio: 2, campo: "CFE" },
    { id_carrera: 53, id_materia: 925, anio: 2, campo: "CFE" },
    { id_carrera: 53, id_materia: 125, anio: 2, campo: "CFB" },
    { id_carrera: 53, id_materia: 126, anio: 2, campo: "CFB" },
    { id_carrera: 53, id_materia: 221, anio: 2, campo: "CFB" },
    { id_carrera: 53, id_materia: 223, anio: 2, campo: "CFB" },
    { id_carrera: 53, id_materia: 140, anio: 2, campo: "CFB" },
    { id_carrera: 53, id_materia: 957, anio: 3, campo: "CFC" },
    { id_carrera: 53, id_materia: 924, anio: 3, campo: "CFE" },
    { id_carrera: 53, id_materia: 926, anio: 3, campo: "CFE" },
    { id_carrera: 53, id_materia: 927, anio: 3, campo: "CFE" },
    { id_carrera: 53, id_materia: 928, anio: 3, campo: "CFE" },
    { id_carrera: 53, id_materia: 929, anio: 3, campo: "CFE" },
    { id_carrera: 53, id_materia: 930, anio: 3, campo: "CFE" },
    { id_carrera: 53, id_materia: 224, anio: 3, campo: "CFB" },
    { id_carrera: 53, id_materia: 136, anio: 3, campo: "CFB" },
    { id_carrera: 53, id_materia: 44, anio: 4, campo: "CFC" },
    { id_carrera: 53, id_materia: 931, anio: 4, campo: "CFE" },
    { id_carrera: 53, id_materia: 932, anio: 4, campo: "CFE" },
    { id_carrera: 53, id_materia: 933, anio: 4, campo: "CFE" },
    { id_carrera: 53, id_materia: 934, anio: 4, campo: "CFE" },
    { id_carrera: 53, id_materia: 935, anio: 4, campo: "CFE" },
    { id_carrera: 53, id_materia: 936, anio: 4, campo: "CIC" },
    { id_carrera: 53, id_materia: 135, anio: 4, campo: "CFB" },
    { id_carrera: 53, id_materia: 474, anio: 4, campo: "CFB" },
    { id_carrera: 53, id_materia: 937, anio: 5, campo: "CIC" },
    { id_carrera: 53, id_materia: 938, anio: 5, campo: "CIC" },
    { id_carrera: 53, id_materia: 939, anio: 5, campo: "CIC" },
    { id_carrera: 53, id_materia: 940, anio: 5, campo: "CIC" },
    { id_carrera: 53, id_materia: 472, anio: 5, campo: "CFB" },
    { id_carrera: 53, id_materia: 473, anio: 5, campo: "CFB" },

    /* ***********************************************************************
     * Profesorado en Letras - carrera 2
     */

    { id_carrera: 2, id_materia: 4, anio: 1, campo: "CFC" },
    { id_carrera: 2, id_materia: 7, anio: 2, campo: "CFB" },
    { id_carrera: 2, id_materia: 10, anio: 1, campo: "CFB" },
    { id_carrera: 2, id_materia: 52, anio: 1, campo: "CFB" },
    { id_carrera: 2, id_materia: 15, anio: 2, campo: "CFB" },
    { id_carrera: 2, id_materia: 22, anio: 1, campo: "CFB" },
    { id_carrera: 2, id_materia: 29, anio: 3, campo: "CFB" },
    { id_carrera: 2, id_materia: 31, anio: 3, campo: "CFC" },
    { id_carrera: 2, id_materia: 39, anio: 3, campo: "CFB" },
    { id_carrera: 2, id_materia: 41, anio: 4, campo: "CFC" },
    { id_carrera: 2, id_materia: 44, anio: 4, campo: "CFC" },
    { id_carrera: 2, id_materia: 49, anio: 4, campo: "CFB" },
    { id_carrera: 2, id_materia: 54, anio: 1, campo: "CFE" },
    { id_carrera: 2, id_materia: 55, anio: 1, campo: "CIC" },
    { id_carrera: 2, id_materia: 56, anio: 1, campo: "CFE" },
    { id_carrera: 2, id_materia: 57, anio: 1, campo: "CFE" },
    { id_carrera: 2, id_materia: 58, anio: 1, campo: "CIC" },
    { id_carrera: 2, id_materia: 59, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 60, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 61, anio: 2, campo: "CIC" },
    { id_carrera: 2, id_materia: 62, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 63, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 64, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 65, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 66, anio: 2, campo: "CFE" },
    { id_carrera: 2, id_materia: 67, anio: 3, campo: "CIC" },
    { id_carrera: 2, id_materia: 68, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 69, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 70, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 71, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 72, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 73, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 74, anio: 3, campo: "CFE" },
    { id_carrera: 2, id_materia: 75, anio: 4, campo: "CIC" },
    { id_carrera: 2, id_materia: 76, anio: 4, campo: "CIC" },
    { id_carrera: 2, id_materia: 77, anio: 4, campo: "CFE" },
    { id_carrera: 2, id_materia: 78, anio: 4, campo: "CFE" },
    { id_carrera: 2, id_materia: 79, anio: 4, campo: "CFE" },
    { id_carrera: 2, id_materia: 80, anio: 4, campo: "CFE" },
    { id_carrera: 2, id_materia: 82, anio: 4, campo: "CFE" },

    /* ***********************************************************************
     * Profesorado en Matem�tica - carrera 11
     */
    { id_carrera: 11, id_materia: 4, anio: 1, campo: "CFC" },
    { id_carrera: 11, id_materia: 10, anio: 1, campo: "CFB" },
    { id_carrera: 11, id_materia: 52, anio: 1, campo: "CFB" },
    { id_carrera: 11, id_materia: 22, anio: 1, campo: "CFB" },
    { id_carrera: 11, id_materia: 319, anio: 1, campo: "CFE" },
    { id_carrera: 11, id_materia: 320, anio: 1, campo: "CFE" },
    { id_carrera: 11, id_materia: 321, anio: 1, campo: "CFE" },
    { id_carrera: 11, id_materia: 322, anio: 1, campo: "CFE" },
    { id_carrera: 11, id_materia: 323, anio: 1, campo: "CIC" },
    { id_carrera: 11, id_materia: 7, anio: 2, campo: "CFB" },
    { id_carrera: 11, id_materia: 15, anio: 2, campo: "CFB" },
    { id_carrera: 11, id_materia: 29, anio: 2, campo: "CFB" },
    { id_carrera: 11, id_materia: 31, anio: 2, campo: "CFC" },
    { id_carrera: 11, id_materia: 324, anio: 2, campo: "CFE" },
    { id_carrera: 11, id_materia: 325, anio: 2, campo: "CFE" },
    { id_carrera: 11, id_materia: 326, anio: 2, campo: "CIC" },
    { id_carrera: 11, id_materia: 327, anio: 2, campo: "CFE" },
    { id_carrera: 11, id_materia: 328, anio: 2, campo: "CIC" },
    { id_carrera: 11, id_materia: 39, anio: 3, campo: "CFB" },
    { id_carrera: 11, id_materia: 41, anio: 3, campo: "CFC" },
    { id_carrera: 11, id_materia: 44, anio: 3, campo: "CFC" },
    { id_carrera: 11, id_materia: 49, anio: 3, campo: "CFB" },
    { id_carrera: 11, id_materia: 329, anio: 3, campo: "CFE" },
    { id_carrera: 11, id_materia: 330, anio: 3, campo: "CFE" },
    { id_carrera: 11, id_materia: 331, anio: 3, campo: "CFE" },
    { id_carrera: 11, id_materia: 332, anio: 3, campo: "CIC" },
    { id_carrera: 11, id_materia: 333, anio: 3, campo: "CFE" },
    { id_carrera: 11, id_materia: 334, anio: 3, campo: "CIC" },
    { id_carrera: 11, id_materia: 335, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 336, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 337, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 338, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 339, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 340, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 341, anio: 4, campo: "CFE" },
    { id_carrera: 11, id_materia: 342, anio: 4, campo: "CIC" },

    /* ***********************************************************************
     * Profesorado en Biolog�a - carrera 12
     */
    { id_carrera: 12, id_materia: 4, anio: 1, campo: "CFC" },
    { id_carrera: 12, id_materia: 7, anio: 2, campo: "CFB" },
    { id_carrera: 12, id_materia: 10, anio: 2, campo: "CFB" },
    { id_carrera: 12, id_materia: 52, anio: 3, campo: "CFB" },
    { id_carrera: 12, id_materia: 15, anio: 3, campo: "CFB" },
    { id_carrera: 12, id_materia: 22, anio: 4, campo: "CFB" },
    { id_carrera: 12, id_materia: 29, anio: 1, campo: "CFB" },
    { id_carrera: 12, id_materia: 31, anio: 1, campo: "CFC" },
    { id_carrera: 12, id_materia: 39, anio: 1, campo: "CFB" },
    { id_carrera: 12, id_materia: 41, anio: 2, campo: "CFC" },
    { id_carrera: 12, id_materia: 44, anio: 2, campo: "CFC" },
    { id_carrera: 12, id_materia: 49, anio: 2, campo: "CFB" },
    { id_carrera: 12, id_materia: 371, anio: 2, campo: "CFE" },
    { id_carrera: 12, id_materia: 372, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 373, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 374, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 375, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 376, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 377, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 378, anio: 4, campo: "CFE" },
    { id_carrera: 12, id_materia: 379, anio: 4, campo: "CFE" },
    { id_carrera: 12, id_materia: 380, anio: 4, campo: "CIC" },
    { id_carrera: 12, id_materia: 381, anio: 4, campo: "CFE" },
    { id_carrera: 12, id_materia: 382, anio: 4, campo: "CFE" },
    { id_carrera: 12, id_materia: 383, anio: 4, campo: "CFE" },
    { id_carrera: 12, id_materia: 384, anio: 4, campo: "CFE" },
    { id_carrera: 12, id_materia: 385, anio: 2, campo: "CIC" },
    { id_carrera: 12, id_materia: 386, anio: 1, campo: "CFE" },
    { id_carrera: 12, id_materia: 387, anio: 2, campo: "CFE" },
    { id_carrera: 12, id_materia: 388, anio: 1, campo: "CFE" },
    { id_carrera: 12, id_materia: 389, anio: 1, campo: "CFE" },
    { id_carrera: 12, id_materia: 390, anio: 2, campo: "CFE" },
    { id_carrera: 12, id_materia: 395, anio: 1, campo: "CFE" },
    { id_carrera: 12, id_materia: 320, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 323, anio: 2, campo: "CIC" },
    { id_carrera: 12, id_materia: 326, anio: 3, campo: "CIC" },
    { id_carrera: 12, id_materia: 328, anio: 2, campo: "CIC" },
    { id_carrera: 12, id_materia: 329, anio: 3, campo: "CFE" },
    { id_carrera: 12, id_materia: 332, anio: 4, campo: "CIC" },
    { id_carrera: 12, id_materia: 336, anio: 1, campo: "CFE" },
];

const devolucionCarrera = [
    { 
        careerId: 1, 
        unahurSubjects: [{year:1},{year:4}], englishLevels: [{year:3},{year:4}], 
        suggestionThresholdRegularizedSubjects: 4 
    },
    { 
        careerId: 5, 
        unahurSubjects: [{year: 1}], englishLevels: [{year:2}, {year:3}], 
        suggestionThresholdRegularizedSubjects: 3
    },
    { 
        careerId: 6, 
        unahurSubjects: [{year:1}, {year:2}, {year:3}], englishLevels: [{year:2}], 
        suggestionThresholdRegularizedSubjects: 5 
    },
    { 
        careerId: 7, 
        unahurSubjects: [{year:3, campo: 'CFC1'}], 
        englishLevels: [{year:1, campo: 'CFC1'}], 
        suggestionThresholdRegularizedSubjects: 3 
    },
    { 
        careerId: 13, 
        unahurSubjects: [{ year: 3, campo: 'CFC1' }, { year: 4, campo: 'CFC2'}],
        englishLevels: [{ year: 1, campo: 'CFC1' }, { year: 5, campo: 'CFC2'}], 
        suggestionThresholdRegularizedSubjects: 3
    },
    { 
        careerId: 16, 
        unahurSubjects: [{year:1}, {year:4}], englishLevels: [{year:2}, {year:3}], 
        suggestionThresholdRegularizedSubjects: 3 
    },
    { 
        careerId: 21, 
        unahurSubjects: [{year:3, campo: 'Gral'}], 
        englishLevels: [{ year: 1, campo: 'Gral' }, { year: 2, campo: 'Gral'}], 
        suggestionThresholdRegularizedSubjects: 3 
    },
    { 
        careerId: 31, 
        unahurSubjects: [{year:1}], englishLevels: [{year:2}, {year:3}], 
        suggestionThresholdRegularizedSubjects: 3 
    },
    { 
        careerId: 34, 
        unahurSubjects: [{year:1}, {year:2}, {year:3}], englishLevels: [{year:2}, {year:4}], 
        suggestionThresholdRegularizedSubjects: 5 
    },
    { 
        careerId: 38, 
        unahurSubjects: [{ year: 3, campo: 'Gral' }, { year: 4, campo: 'Gral'}], 
        englishLevels: [{ year: 1, campo: 'Gral' }, { year: 3, campo: 'Gral'}], 
        suggestionThresholdRegularizedSubjects: 3, 
        specialCareerName: "Tecnicatura / Licenciatura en inform�tica"
    }
];

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [autoCompleteOptionsDisabled, setAutoCompleteOptionsDisabled] = useState(true);
  const [desabilitarResto, setDesabilitarResto] = useState(false);
  const [desabilitarNunca, setDesabilitarNunca] = useState(false);
  const [desabilitarSiempre, setDesabilitarSiempre] = useState(false);

  const handleClaveChange = (e) => setClave(e.target.value);
  const handleTextoChange = (e) => setTexto(e.target.value);

  const handleCondicionesChange = (event, values) => {
    setCondicionesSeleccionadas(values);
    setCheckboxValues(Array(values.length).fill(false));

    const isEnCarreraSelected = values.includes('EN_CARRERA');
    const isSiempreSelected = values.includes('SIEMPRE');
    const isNuncaSelected = values.includes('NUNCA');

    setDesabilitarResto(isSiempreSelected || isNuncaSelected);
    setDesabilitarNunca(isSiempreSelected);
    setDesabilitarSiempre(isNuncaSelected);

    if (!isEnCarreraSelected) {
      values = values.filter(cond => !['MATERIAS_PENDIENTES', 'MATERIAS_NO_PENDIENTES'].includes(cond));
      setAutoCompleteOptionsDisabled(true);
    } else {
      setAutoCompleteOptionsDisabled(false);

      // Generar tarjetas de condición automáticamente para "EN_CARRERA"
      const nuevasCondiciones = [];

      devolucionCarrera.forEach(carrera => {
        if (values.includes(`CARRERA_${carrera.careerId}`)) {
          // Añadir las materias de UNAHUR
          carrera.unahurSubjects.forEach(subject => {
            nuevasCondiciones.push({
              condicion: `MATERIA_${subject.year}`,
              campoNumerico: false // Esto puedes ajustarlo según tu lógica
            });
          });

          // Añadir niveles de inglés
          carrera.englishLevels.forEach(level => {
            nuevasCondiciones.push({
              condicion: `NIVEL_INGLES_${level.year}`,
              campoNumerico: false // Esto puedes ajustarlo según tu lógica
            });
          });

          // Añadir la sugerencia de umbral de materias regularizadas
          nuevasCondiciones.push({
            condicion: `UMBRAL_REGULARIZADAS_${carrera.suggestionThresholdRegularizedSubjects}`,
            campoNumerico: true // Esto puedes ajustarlo según tu lógica
          });
        }
      });

      // Ahora debes manejar estas nuevas condiciones como desees
      console.log("Nuevas condiciones generadas automáticamente:", nuevasCondiciones);
    }

    setCondicionesSeleccionadas(values);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setCheckboxValues(newCheckboxValues);
    setAutoCompleteOptionsDisabled(!newCheckboxValues[index]);
  };

  const getOptionDisabled = (option) => {
    if (autoCompleteOptionsDisabled && ['MATERIAS_PENDIENTES', 'MATERIAS_NO_PENDIENTES'].includes(option)) {
      return true;
    }
    if (desabilitarResto && !['SIEMPRE', 'NUNCA', 'FINALES_PENDIENTES', 'LIMITE_FINALES_PENDIENTIENTES', 'ORIENTACION'].includes(option)) {
      return true;
    }
    if (desabilitarSiempre && option === 'SIEMPRE') {
      return true;
    }
    if (desabilitarNunca && option === 'NUNCA') {
      return true;
    }
    return false;
  };

  return (
    <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
      <TextField label="Texto" value={texto} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
      <Stack sx={{}}>
        <Autocomplete
          multiple
          id="condiciones-select"
          options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTIENTES", "ORIENTACION"]}
          value={condicionesSeleccionadas}
          onChange={handleCondicionesChange}
          renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
          sx={{ mt: 2 }}
          getOptionDisabled={getOptionDisabled}
        />
        <Box sx={{ mt: 2, width: '100%' }}>
          {!desabilitarNunca && !desabilitarSiempre && condicionesSeleccionadas?.filter(cond => cond !== "SIEMPRE" && cond !== "NUNCA")?.map((condicion, index) => (
            !['MATERIAS_COMUNES', 'FINALES_PENDIENTES', 'LIMITE_FINALES_PENDIENTIENTES', 'ORIENTACION']?.includes(condicion) && (
              <TarjetaCondicion
                key={index}
                condicion={condicion}
                devolucionCarreras={devolucionCarrera}
                listadoSubjectData={listadoSubjectDat.filter(materia => materia.id_carrera === devolucionCarrera[0].careerId)} // Filtrar materias por carrera seleccionada
                onCheckboxChange={() => handleCheckboxChange(index)}
                checkboxValue={checkboxValues[index]}
                deshabilitarCampoNumerico={!checkboxValues[index]}
              />
            )
          ))}
        </Box>
      </Stack>
      <Box display="flex" justifyContent="space-around">
        <Button type="submit" variant="contained" color="primary">Guardar</Button>
        <Button variant="contained" color="secondary" onClick={onCancel}>Cancelar</Button>
      </Box>
    </Box>
  );
};

export default EdicionParrafo;