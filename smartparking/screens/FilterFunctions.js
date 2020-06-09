export function filterFunction(data, allType, freeType, payType, price, distance, time, mediumAvailability, highAvailability, hSpot, pSpot, eSpot) {

      var finalData;

        if (allType) {
          finalData = data;
    
          if (price != 0) {
    
            finalData = finalData.filter(function (area) {
              return area.price < price;
            });
          }
        }
        else if (payType) {
    
          finalData = data.filter(function (area) {
            return area.price > 0;
          });
    
          //PRICE
          if (price != 0) {
    
            finalData = finalData.filter(function (area) {
              return area.price <= price;
            });
          }
        }
        else if (freeType) {
    
          finalData = data.filter(function (area) {
            return area.price == 0;
          });
        }
    
        //DISTANCE
    
        if (distance != 0) {
    
          finalData = finalData.filter(function (area) {
            var s = area.distance.substr(0, area.distance.length - 3)
            return parseFloat(s) <= distance;
          });
        } 
    
    
        //TIME
    
        if (time != 0) {
    
          finalData = finalData.filter(function (area) {
            var t = area.time.substr(0, area.time.length - 5)
            return parseFloat(t) <= time;
          });
        }
    
    
    
        //MEDIUM
        if (mediumAvailability) {
    
          finalData = finalData.filter(function (area) {
            return (1 - (area.nTaken / area.nTot)) * 100 >= 33;
          });
        }
    
        //HIGH
        if (highAvailability) {
          finalData = finalData.filter(function (area) {
            return (1 - (area.nTaken / area.nTot)) * 100 >= 66;
          });
        }
    
    
        //H
        if (hSpot) {
    
          finalData = finalData.filter(function (area) {
            return (area.nHandicap != 0);
          });
    
        }
    
        if (pSpot) {
    
          finalData = finalData.filter(function (area) {
            return (area.nPregnant != 0);
          });
        }
    
        if (eSpot) {
    
          finalData = finalData.filter(function (area) {
            return (area.nElectric != 0);
          });
        }
    
        
        return finalData;

    

}