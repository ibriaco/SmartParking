  const { filterFunction } = require('./FilterFunctions')

  const initialData = [ {
    "address" : "Corso XXV Aprile, 1",
    "distance" : "3 km",
    "fromH" : "8",
    "id" : 0,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.170328,
    "longitude" : 9.872031,
    "nElectric" : 7,
    "nHandicap" : 0,
    "nPregnant" : 0,
    "nTaken" : 15,
    "nTot" : 20,
    "price" : 0,
    "reports" : "The price is different",
    "time" : "10 mins",
    "toH" : "16"
  }, {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,
    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData1 = initialData;

  const finalData2 = [ {
    "address" : "Corso XXV Aprile, 1",
    "distance" : "3 km",
    "fromH" : "8",
    "id" : 0,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.170328,
    "longitude" : 9.872031,
    "nElectric" : 7,
    "nHandicap" : 0,
    "nPregnant" : 0,
    "nTaken" : 15,
    "nTot" : 20,
    "price" : 0,
    "reports" : "The price is different",
    "time" : "10 mins",
    "toH" : "16"
  } ];

  const finalData3 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,
    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData4 = [ {
    "address" : "Corso XXV Aprile, 1",
    "distance" : "3 km",
    "fromH" : "8",
    "id" : 0,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.170328,
    "longitude" : 9.872031,
    "nElectric" : 7,
    "nHandicap" : 0,
    "nPregnant" : 0,
    "nTaken" : 15,
    "nTot" : 20,
    "price" : 0,
    "reports" : "The price is different",
    "time" : "10 mins",
    "toH" : "16"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData5 = [ {
    "address" : "Corso XXV Aprile, 1",
    "distance" : "3 km",
    "fromH" : "8",
    "id" : 0,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.170328,
    "longitude" : 9.872031,
    "nElectric" : 7,
    "nHandicap" : 0,
    "nPregnant" : 0,
    "nTaken" : 15,
    "nTot" : 20,
    "price" : 0,
    "reports" : "The price is different",
    "time" : "10 mins",
    "toH" : "16"
  }, {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  } ];

  const finalData6 = [ {
    "address" : "Corso XXV Aprile, 1",
    "distance" : "3 km",
    "fromH" : "8",
    "id" : 0,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.170328,
    "longitude" : 9.872031,
    "nElectric" : 7,
    "nHandicap" : 0,
    "nPregnant" : 0,
    "nTaken" : 15,
    "nTot" : 20,
    "price" : 0,
    "reports" : "The price is different",
    "time" : "10 mins",
    "toH" : "16"
  }, {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  } ];

  const finalData7 = [ {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData8 = [ {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData9 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData10 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, 
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData11 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData12 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, {
    "address" : "Piazza Cavour, 13",
    "distance" : "6 km",
    "fromH" : "0",
    "id" : 2,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.172707,
    "longitude" : 9.870619,
    "nElectric" : 0,
    "nHandicap" : 4,
    "nPregnant" : 2,
    "nTaken" : 12,
    "nTot" : 30,
    "price" : 1.5,
    "reports" : "The price is different",
    "time" : "12 mins",
    "toH" : "23"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData13 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, 
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData14 = [ {
    "address" : "Corso XXV Aprile, 1",
    "distance" : "3 km",
    "fromH" : "8",
    "id" : 0,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.170328,
    "longitude" : 9.872031,
    "nElectric" : 7,
    "nHandicap" : 0,
    "nPregnant" : 0,
    "nTaken" : 15,
    "nTot" : 20,
    "price" : 0,
    "reports" : "The price is different",
    "time" : "10 mins",
    "toH" : "16"
  }, {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  }, 
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData15 = [ {
    "address" : "P.le Giovanni Bertacchi, 5",
    "distance" : "2 km",
    "fromH" : "20",
    "id" : 1,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 46.168213,
    "longitude" : 9.872202,
    "nElectric" : 10,
    "nHandicap" : 10,
    "nPregnant" : 4,
    "nTaken" : 78,
    "nTot" : 100,
    "price" : 2.5,
    "reports" : "The price is different",
    "time" : "5 mins",
    "toH" : "22"
  },
  {
    "address" : "Piazza dei Daini, 4",
    "distance" : "78 km",
    "fromH" : "0",
    "id" : 3,
    "image" : {
      "uri" : "https://firebasestorage.googleapis.com/v0/b/smartparking-19214.appspot.com/o/streetview.jpg?alt=media&token=29740087-128a-4b4e-81b7-552cda1fc51c"
    },
    "latitude" : 45.516473,
    "longitude" : 9.210518,
    "nElectric" : 2,
    "nHandicap" : 3,
    "nPregnant" : 1,
    "nTaken" : 1,    "nTot" : 50,
    "price" : 1.5,
    "time" : "40 mins",
    "toH" : "23"
  } ];

  const finalData16 = [];



  //filterFunction(data, allType, freeType, payType, price, distance, time, mediumAvailability, highAvailability, hSpot, pSpot, eSpot) 

  test('Filtering FREE means no pay parkings', () => {
    expect(filterFunction(initialData, false, true, false, 0, 0, 0, false, false, false, false, false )).toStrictEqual(finalData2)
  })

  test('Filtering PAY means no free parkings', () => {
    expect(filterFunction(initialData, false, false, true, 0, 0, 0, false, false, false, false, false )).toStrictEqual(finalData3)
  })

  test('Filtering MAX 2 € PRICE means no parkings with price > 2', () => {
    expect(filterFunction(initialData, true, false, false, 2, 0, 0, false, false, false, false, false )).toStrictEqual(finalData4)
  })

  test('Filtering MAX 4 km DISTANCE means no parkings with distance > 4', () => {
    expect(filterFunction(initialData, true, false, false, 0, 4, 0, false, false, false, false, false )).toStrictEqual(finalData5)
  })

  test('Filtering MAX 20 mins TIME means no parkings with time > 20', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 20, false, false, false, false, false )).toStrictEqual(finalData6)

  })
  
  test('Filtering MEDIUM AVAILABILITY means no parkings with low', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, true, false, false, false, false )).toStrictEqual(finalData7)

  })

  test('Filtering HIGH AVAILABILITY means no parkings with low or medium', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, true, false, false, false )).toStrictEqual(finalData8)

  })
  
  test('Filtering DISABLES means all parkings have a disable spot', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, true, false, false )).toStrictEqual(finalData9)

  })

  test('Filtering DISABLES + ELECTRIC means all parkings have a disable and electric spot', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, true, false, true )).toStrictEqual(finalData10)

  })

  test('Filtering DISABLES + PREGNANT means all parkings have a disable and pregnant spot', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, true, true, false )).toStrictEqual(finalData11)

  })

  test('Filtering PREGNANT means all parkings have a pregnant spot', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, false, true, false )).toStrictEqual(finalData12)

  })

  test('Filtering PREGNANT + ELECTRIC means all parkings have a pregnant and electric spot', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, false, true, true )).toStrictEqual(finalData13)

  })

  test('Filtering ELECTRIC means all parkings have a electric spot', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, false, false, true )).toStrictEqual(finalData14)

  })

  test('Filtering DISABLES + PREGNANT + ELECTRIC means all parkings have a all spot type', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, true, true, true )).toStrictEqual(finalData15)

  })  

  test('LIMIT CASE 1: all parkings returned', () => {
    expect(filterFunction(initialData, true, false, false, 0, 0, 0, false, false, false, false, false )).toStrictEqual(finalData1)
  })

  test('LIMIT CASE 2: no parkings returned', () => {
    expect(filterFunction(initialData, false, false, true, 0, 1, 1, false, false, true, true, true )).toStrictEqual(finalData16)

  })

