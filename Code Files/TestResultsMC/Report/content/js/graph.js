/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "maxY": 122.0, "series": [{"data": [[0.0, 3.0], [0.1, 5.0], [0.2, 6.0], [0.3, 7.0], [0.4, 8.0], [0.5, 8.0], [0.6, 9.0], [0.7, 10.0], [0.8, 10.0], [0.9, 10.0], [1.0, 11.0], [1.1, 11.0], [1.2, 11.0], [1.3, 12.0], [1.4, 12.0], [1.5, 12.0], [1.6, 12.0], [1.7, 12.0], [1.8, 12.0], [1.9, 13.0], [2.0, 13.0], [2.1, 13.0], [2.2, 13.0], [2.3, 13.0], [2.4, 13.0], [2.5, 13.0], [2.6, 13.0], [2.7, 14.0], [2.8, 14.0], [2.9, 14.0], [3.0, 14.0], [3.1, 14.0], [3.2, 14.0], [3.3, 14.0], [3.4, 14.0], [3.5, 14.0], [3.6, 14.0], [3.7, 15.0], [3.8, 15.0], [3.9, 15.0], [4.0, 15.0], [4.1, 15.0], [4.2, 15.0], [4.3, 15.0], [4.4, 15.0], [4.5, 15.0], [4.6, 15.0], [4.7, 15.0], [4.8, 15.0], [4.9, 15.0], [5.0, 15.0], [5.1, 15.0], [5.2, 15.0], [5.3, 16.0], [5.4, 16.0], [5.5, 16.0], [5.6, 16.0], [5.7, 16.0], [5.8, 16.0], [5.9, 16.0], [6.0, 16.0], [6.1, 16.0], [6.2, 16.0], [6.3, 16.0], [6.4, 16.0], [6.5, 16.0], [6.6, 16.0], [6.7, 16.0], [6.8, 16.0], [6.9, 16.0], [7.0, 16.0], [7.1, 16.0], [7.2, 17.0], [7.3, 17.0], [7.4, 17.0], [7.5, 17.0], [7.6, 17.0], [7.7, 17.0], [7.8, 17.0], [7.9, 17.0], [8.0, 17.0], [8.1, 17.0], [8.2, 17.0], [8.3, 17.0], [8.4, 17.0], [8.5, 17.0], [8.6, 17.0], [8.7, 17.0], [8.8, 17.0], [8.9, 17.0], [9.0, 18.0], [9.1, 18.0], [9.2, 18.0], [9.3, 18.0], [9.4, 18.0], [9.5, 18.0], [9.6, 18.0], [9.7, 18.0], [9.8, 18.0], [9.9, 18.0], [10.0, 18.0], [10.1, 18.0], [10.2, 18.0], [10.3, 18.0], [10.4, 18.0], [10.5, 18.0], [10.6, 18.0], [10.7, 18.0], [10.8, 19.0], [10.9, 19.0], [11.0, 19.0], [11.1, 19.0], [11.2, 19.0], [11.3, 19.0], [11.4, 19.0], [11.5, 19.0], [11.6, 19.0], [11.7, 19.0], [11.8, 19.0], [11.9, 19.0], [12.0, 19.0], [12.1, 19.0], [12.2, 19.0], [12.3, 19.0], [12.4, 19.0], [12.5, 20.0], [12.6, 20.0], [12.7, 20.0], [12.8, 20.0], [12.9, 20.0], [13.0, 20.0], [13.1, 20.0], [13.2, 20.0], [13.3, 20.0], [13.4, 20.0], [13.5, 20.0], [13.6, 20.0], [13.7, 20.0], [13.8, 20.0], [13.9, 20.0], [14.0, 20.0], [14.1, 20.0], [14.2, 21.0], [14.3, 21.0], [14.4, 21.0], [14.5, 21.0], [14.6, 21.0], [14.7, 21.0], [14.8, 21.0], [14.9, 21.0], [15.0, 21.0], [15.1, 21.0], [15.2, 21.0], [15.3, 21.0], [15.4, 21.0], [15.5, 21.0], [15.6, 21.0], [15.7, 21.0], [15.8, 21.0], [15.9, 22.0], [16.0, 22.0], [16.1, 22.0], [16.2, 22.0], [16.3, 22.0], [16.4, 22.0], [16.5, 22.0], [16.6, 22.0], [16.7, 22.0], [16.8, 22.0], [16.9, 22.0], [17.0, 22.0], [17.1, 22.0], [17.2, 22.0], [17.3, 22.0], [17.4, 22.0], [17.5, 23.0], [17.6, 23.0], [17.7, 23.0], [17.8, 23.0], [17.9, 23.0], [18.0, 23.0], [18.1, 23.0], [18.2, 23.0], [18.3, 23.0], [18.4, 23.0], [18.5, 23.0], [18.6, 23.0], [18.7, 23.0], [18.8, 23.0], [18.9, 23.0], [19.0, 23.0], [19.1, 23.0], [19.2, 23.0], [19.3, 24.0], [19.4, 24.0], [19.5, 24.0], [19.6, 24.0], [19.7, 24.0], [19.8, 24.0], [19.9, 24.0], [20.0, 24.0], [20.1, 24.0], [20.2, 24.0], [20.3, 24.0], [20.4, 24.0], [20.5, 24.0], [20.6, 24.0], [20.7, 24.0], [20.8, 24.0], [20.9, 24.0], [21.0, 24.0], [21.1, 24.0], [21.2, 24.0], [21.3, 25.0], [21.4, 25.0], [21.5, 25.0], [21.6, 25.0], [21.7, 25.0], [21.8, 25.0], [21.9, 25.0], [22.0, 25.0], [22.1, 25.0], [22.2, 25.0], [22.3, 25.0], [22.4, 25.0], [22.5, 25.0], [22.6, 25.0], [22.7, 25.0], [22.8, 25.0], [22.9, 25.0], [23.0, 25.0], [23.1, 25.0], [23.2, 26.0], [23.3, 26.0], [23.4, 26.0], [23.5, 26.0], [23.6, 26.0], [23.7, 26.0], [23.8, 26.0], [23.9, 26.0], [24.0, 26.0], [24.1, 26.0], [24.2, 26.0], [24.3, 26.0], [24.4, 26.0], [24.5, 26.0], [24.6, 26.0], [24.7, 26.0], [24.8, 26.0], [24.9, 26.0], [25.0, 26.0], [25.1, 27.0], [25.2, 27.0], [25.3, 27.0], [25.4, 27.0], [25.5, 27.0], [25.6, 27.0], [25.7, 27.0], [25.8, 27.0], [25.9, 27.0], [26.0, 27.0], [26.1, 27.0], [26.2, 27.0], [26.3, 27.0], [26.4, 27.0], [26.5, 27.0], [26.6, 27.0], [26.7, 27.0], [26.8, 27.0], [26.9, 27.0], [27.0, 28.0], [27.1, 28.0], [27.2, 28.0], [27.3, 28.0], [27.4, 28.0], [27.5, 28.0], [27.6, 28.0], [27.7, 28.0], [27.8, 28.0], [27.9, 28.0], [28.0, 28.0], [28.1, 28.0], [28.2, 28.0], [28.3, 28.0], [28.4, 28.0], [28.5, 28.0], [28.6, 28.0], [28.7, 28.0], [28.8, 28.0], [28.9, 28.0], [29.0, 28.0], [29.1, 29.0], [29.2, 29.0], [29.3, 29.0], [29.4, 29.0], [29.5, 29.0], [29.6, 29.0], [29.7, 29.0], [29.8, 29.0], [29.9, 29.0], [30.0, 29.0], [30.1, 29.0], [30.2, 29.0], [30.3, 29.0], [30.4, 29.0], [30.5, 29.0], [30.6, 29.0], [30.7, 29.0], [30.8, 29.0], [30.9, 29.0], [31.0, 29.0], [31.1, 30.0], [31.2, 30.0], [31.3, 30.0], [31.4, 30.0], [31.5, 30.0], [31.6, 30.0], [31.7, 30.0], [31.8, 30.0], [31.9, 30.0], [32.0, 30.0], [32.1, 30.0], [32.2, 30.0], [32.3, 30.0], [32.4, 30.0], [32.5, 30.0], [32.6, 30.0], [32.7, 30.0], [32.8, 30.0], [32.9, 30.0], [33.0, 30.0], [33.1, 31.0], [33.2, 31.0], [33.3, 31.0], [33.4, 31.0], [33.5, 31.0], [33.6, 31.0], [33.7, 31.0], [33.8, 31.0], [33.9, 31.0], [34.0, 31.0], [34.1, 31.0], [34.2, 31.0], [34.3, 31.0], [34.4, 31.0], [34.5, 31.0], [34.6, 31.0], [34.7, 31.0], [34.8, 31.0], [34.9, 31.0], [35.0, 31.0], [35.1, 32.0], [35.2, 32.0], [35.3, 32.0], [35.4, 32.0], [35.5, 32.0], [35.6, 32.0], [35.7, 32.0], [35.8, 32.0], [35.9, 32.0], [36.0, 32.0], [36.1, 32.0], [36.2, 32.0], [36.3, 32.0], [36.4, 32.0], [36.5, 32.0], [36.6, 32.0], [36.7, 32.0], [36.8, 32.0], [36.9, 32.0], [37.0, 32.0], [37.1, 32.0], [37.2, 33.0], [37.3, 33.0], [37.4, 33.0], [37.5, 33.0], [37.6, 33.0], [37.7, 33.0], [37.8, 33.0], [37.9, 33.0], [38.0, 33.0], [38.1, 33.0], [38.2, 33.0], [38.3, 33.0], [38.4, 33.0], [38.5, 33.0], [38.6, 33.0], [38.7, 33.0], [38.8, 33.0], [38.9, 33.0], [39.0, 33.0], [39.1, 33.0], [39.2, 33.0], [39.3, 34.0], [39.4, 34.0], [39.5, 34.0], [39.6, 34.0], [39.7, 34.0], [39.8, 34.0], [39.9, 34.0], [40.0, 34.0], [40.1, 34.0], [40.2, 34.0], [40.3, 34.0], [40.4, 34.0], [40.5, 34.0], [40.6, 34.0], [40.7, 34.0], [40.8, 34.0], [40.9, 34.0], [41.0, 34.0], [41.1, 34.0], [41.2, 34.0], [41.3, 34.0], [41.4, 34.0], [41.5, 34.0], [41.6, 35.0], [41.7, 35.0], [41.8, 35.0], [41.9, 35.0], [42.0, 35.0], [42.1, 35.0], [42.2, 35.0], [42.3, 35.0], [42.4, 35.0], [42.5, 35.0], [42.6, 35.0], [42.7, 35.0], [42.8, 35.0], [42.9, 35.0], [43.0, 35.0], [43.1, 35.0], [43.2, 35.0], [43.3, 35.0], [43.4, 35.0], [43.5, 35.0], [43.6, 35.0], [43.7, 35.0], [43.8, 35.0], [43.9, 36.0], [44.0, 36.0], [44.1, 36.0], [44.2, 36.0], [44.3, 36.0], [44.4, 36.0], [44.5, 36.0], [44.6, 36.0], [44.7, 36.0], [44.8, 36.0], [44.9, 36.0], [45.0, 36.0], [45.1, 36.0], [45.2, 36.0], [45.3, 36.0], [45.4, 36.0], [45.5, 36.0], [45.6, 36.0], [45.7, 36.0], [45.8, 36.0], [45.9, 36.0], [46.0, 36.0], [46.1, 36.0], [46.2, 37.0], [46.3, 37.0], [46.4, 37.0], [46.5, 37.0], [46.6, 37.0], [46.7, 37.0], [46.8, 37.0], [46.9, 37.0], [47.0, 37.0], [47.1, 37.0], [47.2, 37.0], [47.3, 37.0], [47.4, 37.0], [47.5, 37.0], [47.6, 37.0], [47.7, 37.0], [47.8, 37.0], [47.9, 37.0], [48.0, 37.0], [48.1, 37.0], [48.2, 37.0], [48.3, 37.0], [48.4, 38.0], [48.5, 38.0], [48.6, 38.0], [48.7, 38.0], [48.8, 38.0], [48.9, 38.0], [49.0, 38.0], [49.1, 38.0], [49.2, 38.0], [49.3, 38.0], [49.4, 38.0], [49.5, 38.0], [49.6, 38.0], [49.7, 38.0], [49.8, 38.0], [49.9, 38.0], [50.0, 38.0], [50.1, 38.0], [50.2, 38.0], [50.3, 38.0], [50.4, 39.0], [50.5, 39.0], [50.6, 39.0], [50.7, 39.0], [50.8, 39.0], [50.9, 39.0], [51.0, 39.0], [51.1, 39.0], [51.2, 39.0], [51.3, 39.0], [51.4, 39.0], [51.5, 39.0], [51.6, 39.0], [51.7, 39.0], [51.8, 39.0], [51.9, 39.0], [52.0, 39.0], [52.1, 39.0], [52.2, 39.0], [52.3, 39.0], [52.4, 40.0], [52.5, 40.0], [52.6, 40.0], [52.7, 40.0], [52.8, 40.0], [52.9, 40.0], [53.0, 40.0], [53.1, 40.0], [53.2, 40.0], [53.3, 40.0], [53.4, 40.0], [53.5, 40.0], [53.6, 40.0], [53.7, 40.0], [53.8, 40.0], [53.9, 40.0], [54.0, 40.0], [54.1, 41.0], [54.2, 41.0], [54.3, 41.0], [54.4, 41.0], [54.5, 41.0], [54.6, 41.0], [54.7, 41.0], [54.8, 41.0], [54.9, 41.0], [55.0, 41.0], [55.1, 41.0], [55.2, 41.0], [55.3, 41.0], [55.4, 41.0], [55.5, 41.0], [55.6, 41.0], [55.7, 41.0], [55.8, 42.0], [55.9, 42.0], [56.0, 42.0], [56.1, 42.0], [56.2, 42.0], [56.3, 42.0], [56.4, 42.0], [56.5, 42.0], [56.6, 42.0], [56.7, 42.0], [56.8, 42.0], [56.9, 42.0], [57.0, 42.0], [57.1, 42.0], [57.2, 42.0], [57.3, 42.0], [57.4, 43.0], [57.5, 43.0], [57.6, 43.0], [57.7, 43.0], [57.8, 43.0], [57.9, 43.0], [58.0, 43.0], [58.1, 43.0], [58.2, 43.0], [58.3, 43.0], [58.4, 43.0], [58.5, 43.0], [58.6, 43.0], [58.7, 44.0], [58.8, 44.0], [58.9, 44.0], [59.0, 44.0], [59.1, 44.0], [59.2, 44.0], [59.3, 44.0], [59.4, 44.0], [59.5, 44.0], [59.6, 44.0], [59.7, 44.0], [59.8, 44.0], [59.9, 44.0], [60.0, 45.0], [60.1, 45.0], [60.2, 45.0], [60.3, 45.0], [60.4, 45.0], [60.5, 45.0], [60.6, 45.0], [60.7, 45.0], [60.8, 45.0], [60.9, 45.0], [61.0, 45.0], [61.1, 45.0], [61.2, 46.0], [61.3, 46.0], [61.4, 46.0], [61.5, 46.0], [61.6, 46.0], [61.7, 46.0], [61.8, 46.0], [61.9, 46.0], [62.0, 46.0], [62.1, 46.0], [62.2, 46.0], [62.3, 46.0], [62.4, 46.0], [62.5, 46.0], [62.6, 47.0], [62.7, 47.0], [62.8, 47.0], [62.9, 47.0], [63.0, 47.0], [63.1, 47.0], [63.2, 47.0], [63.3, 47.0], [63.4, 47.0], [63.5, 47.0], [63.6, 47.0], [63.7, 47.0], [63.8, 47.0], [63.9, 48.0], [64.0, 48.0], [64.1, 48.0], [64.2, 48.0], [64.3, 48.0], [64.4, 48.0], [64.5, 48.0], [64.6, 48.0], [64.7, 48.0], [64.8, 48.0], [64.9, 48.0], [65.0, 48.0], [65.1, 48.0], [65.2, 48.0], [65.3, 49.0], [65.4, 49.0], [65.5, 49.0], [65.6, 49.0], [65.7, 49.0], [65.8, 49.0], [65.9, 49.0], [66.0, 49.0], [66.1, 49.0], [66.2, 49.0], [66.3, 49.0], [66.4, 49.0], [66.5, 49.0], [66.6, 49.0], [66.7, 50.0], [66.8, 50.0], [66.9, 50.0], [67.0, 50.0], [67.1, 50.0], [67.2, 50.0], [67.3, 50.0], [67.4, 50.0], [67.5, 50.0], [67.6, 50.0], [67.7, 50.0], [67.8, 50.0], [67.9, 50.0], [68.0, 50.0], [68.1, 51.0], [68.2, 51.0], [68.3, 51.0], [68.4, 51.0], [68.5, 51.0], [68.6, 51.0], [68.7, 51.0], [68.8, 51.0], [68.9, 51.0], [69.0, 51.0], [69.1, 51.0], [69.2, 51.0], [69.3, 51.0], [69.4, 51.0], [69.5, 52.0], [69.6, 52.0], [69.7, 52.0], [69.8, 52.0], [69.9, 52.0], [70.0, 52.0], [70.1, 52.0], [70.2, 52.0], [70.3, 52.0], [70.4, 52.0], [70.5, 52.0], [70.6, 52.0], [70.7, 52.0], [70.8, 52.0], [70.9, 52.0], [71.0, 53.0], [71.1, 53.0], [71.2, 53.0], [71.3, 53.0], [71.4, 53.0], [71.5, 53.0], [71.6, 53.0], [71.7, 53.0], [71.8, 53.0], [71.9, 53.0], [72.0, 53.0], [72.1, 53.0], [72.2, 53.0], [72.3, 53.0], [72.4, 54.0], [72.5, 54.0], [72.6, 54.0], [72.7, 54.0], [72.8, 54.0], [72.9, 54.0], [73.0, 54.0], [73.1, 54.0], [73.2, 54.0], [73.3, 54.0], [73.4, 54.0], [73.5, 54.0], [73.6, 54.0], [73.7, 54.0], [73.8, 54.0], [73.9, 55.0], [74.0, 55.0], [74.1, 55.0], [74.2, 55.0], [74.3, 55.0], [74.4, 55.0], [74.5, 55.0], [74.6, 55.0], [74.7, 55.0], [74.8, 55.0], [74.9, 55.0], [75.0, 55.0], [75.1, 55.0], [75.2, 55.0], [75.3, 55.0], [75.4, 56.0], [75.5, 56.0], [75.6, 56.0], [75.7, 56.0], [75.8, 56.0], [75.9, 56.0], [76.0, 56.0], [76.1, 56.0], [76.2, 56.0], [76.3, 56.0], [76.4, 56.0], [76.5, 56.0], [76.6, 56.0], [76.7, 56.0], [76.8, 56.0], [76.9, 56.0], [77.0, 57.0], [77.1, 57.0], [77.2, 57.0], [77.3, 57.0], [77.4, 57.0], [77.5, 57.0], [77.6, 57.0], [77.7, 57.0], [77.8, 57.0], [77.9, 57.0], [78.0, 57.0], [78.1, 57.0], [78.2, 57.0], [78.3, 57.0], [78.4, 57.0], [78.5, 57.0], [78.6, 58.0], [78.7, 58.0], [78.8, 58.0], [78.9, 58.0], [79.0, 58.0], [79.1, 58.0], [79.2, 58.0], [79.3, 58.0], [79.4, 58.0], [79.5, 58.0], [79.6, 58.0], [79.7, 58.0], [79.8, 58.0], [79.9, 58.0], [80.0, 58.0], [80.1, 58.0], [80.2, 59.0], [80.3, 59.0], [80.4, 59.0], [80.5, 59.0], [80.6, 59.0], [80.7, 59.0], [80.8, 59.0], [80.9, 59.0], [81.0, 59.0], [81.1, 59.0], [81.2, 59.0], [81.3, 59.0], [81.4, 59.0], [81.5, 59.0], [81.6, 60.0], [81.7, 60.0], [81.8, 60.0], [81.9, 60.0], [82.0, 60.0], [82.1, 60.0], [82.2, 60.0], [82.3, 60.0], [82.4, 60.0], [82.5, 60.0], [82.6, 60.0], [82.7, 60.0], [82.8, 60.0], [82.9, 60.0], [83.0, 60.0], [83.1, 61.0], [83.2, 61.0], [83.3, 61.0], [83.4, 61.0], [83.5, 61.0], [83.6, 61.0], [83.7, 61.0], [83.8, 61.0], [83.9, 61.0], [84.0, 61.0], [84.1, 61.0], [84.2, 61.0], [84.3, 61.0], [84.4, 62.0], [84.5, 62.0], [84.6, 62.0], [84.7, 62.0], [84.8, 62.0], [84.9, 62.0], [85.0, 62.0], [85.1, 62.0], [85.2, 62.0], [85.3, 62.0], [85.4, 62.0], [85.5, 62.0], [85.6, 62.0], [85.7, 63.0], [85.8, 63.0], [85.9, 63.0], [86.0, 63.0], [86.1, 63.0], [86.2, 63.0], [86.3, 63.0], [86.4, 63.0], [86.5, 63.0], [86.6, 63.0], [86.7, 63.0], [86.8, 63.0], [86.9, 63.0], [87.0, 64.0], [87.1, 64.0], [87.2, 64.0], [87.3, 64.0], [87.4, 64.0], [87.5, 64.0], [87.6, 64.0], [87.7, 64.0], [87.8, 64.0], [87.9, 64.0], [88.0, 65.0], [88.1, 65.0], [88.2, 65.0], [88.3, 65.0], [88.4, 65.0], [88.5, 65.0], [88.6, 65.0], [88.7, 65.0], [88.8, 65.0], [88.9, 65.0], [89.0, 65.0], [89.1, 66.0], [89.2, 66.0], [89.3, 66.0], [89.4, 66.0], [89.5, 66.0], [89.6, 66.0], [89.7, 66.0], [89.8, 66.0], [89.9, 66.0], [90.0, 66.0], [90.1, 67.0], [90.2, 67.0], [90.3, 67.0], [90.4, 67.0], [90.5, 67.0], [90.6, 67.0], [90.7, 67.0], [90.8, 67.0], [90.9, 67.0], [91.0, 67.0], [91.1, 68.0], [91.2, 68.0], [91.3, 68.0], [91.4, 68.0], [91.5, 68.0], [91.6, 68.0], [91.7, 68.0], [91.8, 68.0], [91.9, 68.0], [92.0, 69.0], [92.1, 69.0], [92.2, 69.0], [92.3, 69.0], [92.4, 69.0], [92.5, 69.0], [92.6, 69.0], [92.7, 69.0], [92.8, 70.0], [92.9, 70.0], [93.0, 70.0], [93.1, 70.0], [93.2, 70.0], [93.3, 70.0], [93.4, 70.0], [93.5, 71.0], [93.6, 71.0], [93.7, 71.0], [93.8, 71.0], [93.9, 71.0], [94.0, 71.0], [94.1, 71.0], [94.2, 72.0], [94.3, 72.0], [94.4, 72.0], [94.5, 72.0], [94.6, 72.0], [94.7, 72.0], [94.8, 73.0], [94.9, 73.0], [95.0, 73.0], [95.1, 73.0], [95.2, 73.0], [95.3, 73.0], [95.4, 74.0], [95.5, 74.0], [95.6, 74.0], [95.7, 74.0], [95.8, 74.0], [95.9, 75.0], [96.0, 75.0], [96.1, 75.0], [96.2, 75.0], [96.3, 76.0], [96.4, 76.0], [96.5, 76.0], [96.6, 76.0], [96.7, 77.0], [96.8, 77.0], [96.9, 77.0], [97.0, 77.0], [97.1, 78.0], [97.2, 78.0], [97.3, 78.0], [97.4, 78.0], [97.5, 79.0], [97.6, 79.0], [97.7, 79.0], [97.8, 80.0], [97.9, 80.0], [98.0, 81.0], [98.1, 81.0], [98.2, 81.0], [98.3, 82.0], [98.4, 82.0], [98.5, 83.0], [98.6, 83.0], [98.7, 84.0], [98.8, 84.0], [98.9, 85.0], [99.0, 86.0], [99.1, 86.0], [99.2, 87.0], [99.3, 88.0], [99.4, 89.0], [99.5, 91.0], [99.6, 92.0], [99.7, 94.0], [99.8, 96.0], [99.9, 101.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 65.0, "minX": 0.0, "maxY": 49935.0, "series": [{"data": [[0.0, 49935.0], [100.0, 65.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 8391.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 41609.0, "series": [{"data": [[0.0, 41609.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 8391.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 42.297640000000165, "minX": 1.74637224E12, "maxY": 42.297640000000165, "series": [{"data": [[1.74637224E12, 42.297640000000165]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74637224E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 11.814814814814817, "minX": 1.0, "maxY": 52.66402640264027, "series": [{"data": [[2.0, 11.814814814814817], [3.0, 12.199999999999996], [4.0, 12.081081081081077], [5.0, 14.683544303797468], [6.0, 13.886363636363635], [7.0, 13.729166666666663], [8.0, 14.068421052631585], [9.0, 14.429268292682933], [10.0, 15.78235294117647], [11.0, 15.73248407643312], [12.0, 16.150684931506845], [13.0, 15.351351351351344], [14.0, 15.740112994350278], [15.0, 15.855421686746997], [16.0, 18.734597156398078], [17.0, 17.904040404040398], [18.0, 19.621276595744682], [19.0, 18.47808764940239], [20.0, 19.930885529157674], [21.0, 20.30238095238096], [22.0, 21.589743589743602], [23.0, 20.510416666666654], [24.0, 19.764367816091948], [25.0, 20.43575418994415], [26.0, 20.139380530973433], [27.0, 21.209471766848807], [28.0, 22.204968944099395], [29.0, 23.557195571955727], [30.0, 23.15727699530518], [31.0, 24.267441860465116], [32.0, 24.625498007968112], [33.0, 24.651270207852203], [34.0, 25.001745200698092], [35.0, 26.097731239092514], [36.0, 31.132315521628442], [37.0, 27.87788778877887], [38.0, 37.83646112600534], [39.0, 37.94444444444445], [40.0, 42.71094710947111], [41.0, 48.99088145896662], [42.0, 41.315487571701695], [43.0, 49.69354838709679], [44.0, 49.415282392026626], [45.0, 49.70733944954121], [46.0, 44.400365630713], [47.0, 52.66402640264027], [48.0, 51.9715370018976], [49.0, 51.31289640591966], [50.0, 47.751243025771366], [1.0, 14.692307692307692]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[42.2976599999999, 41.139760000000344]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 50.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 432224.26666666666, "minX": 1.74637224E12, "maxY": 439996.5, "series": [{"data": [[1.74637224E12, 439996.5]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74637224E12, 432224.26666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74637224E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 41.139760000000344, "minX": 1.74637224E12, "maxY": 41.139760000000344, "series": [{"data": [[1.74637224E12, 41.139760000000344]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74637224E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 40.94618000000014, "minX": 1.74637224E12, "maxY": 40.94618000000014, "series": [{"data": [[1.74637224E12, 40.94618000000014]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74637224E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.019240000000000056, "minX": 1.74637224E12, "maxY": 0.019240000000000056, "series": [{"data": [[1.74637224E12, 0.019240000000000056]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74637224E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 7.0, "minX": 1.74637224E12, "maxY": 122.0, "series": [{"data": [[1.74637224E12, 122.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74637224E12, 7.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74637224E12, 74.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74637224E12, 91.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74637224E12, 58.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.74637224E12, 80.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74637224E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 4.0, "minX": 174.0, "maxY": 62.0, "series": [{"data": [[705.0, 58.0], [754.0, 17.0], [736.0, 58.0], [798.0, 62.0], [790.0, 58.0], [828.0, 59.0], [801.0, 61.0], [814.0, 61.0], [824.0, 57.0], [826.0, 56.0], [808.0, 57.0], [806.0, 56.0], [803.0, 54.0], [852.0, 58.0], [854.0, 57.0], [856.0, 58.0], [851.0, 58.0], [844.0, 58.0], [840.0, 59.0], [835.0, 59.0], [881.0, 56.0], [887.0, 56.0], [866.0, 57.0], [864.0, 58.0], [870.0, 57.0], [883.0, 57.0], [897.0, 20.0], [907.0, 55.0], [971.0, 23.0], [1078.0, 46.0], [1188.0, 24.0], [1168.0, 27.0], [1158.0, 54.0], [1331.0, 29.0], [1384.0, 33.0], [1394.0, 34.0], [1356.0, 37.0], [1374.0, 36.0], [1416.0, 35.0], [1419.0, 36.0], [1442.0, 35.0], [1456.0, 35.0], [174.0, 14.0], [510.0, 15.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[705.0, 20.0], [754.0, 5.0], [736.0, 21.0], [798.0, 19.0], [790.0, 33.0], [828.0, 21.0], [801.0, 24.0], [814.0, 21.0], [824.0, 24.5], [826.0, 20.0], [808.0, 29.0], [806.0, 30.0], [803.0, 18.0], [852.0, 23.0], [854.0, 22.0], [856.0, 25.0], [851.0, 21.0], [844.0, 19.0], [840.0, 18.0], [835.0, 20.0], [881.0, 21.5], [887.0, 19.0], [866.0, 19.0], [864.0, 25.0], [870.0, 20.0], [883.0, 28.0], [868.0, 15.0], [897.0, 6.0], [907.0, 19.5], [971.0, 6.0], [1078.0, 16.0], [1188.0, 6.0], [1168.0, 10.0], [1158.0, 27.0], [1167.0, 18.0], [1331.0, 9.5], [1333.0, 19.0], [1384.0, 9.0], [1394.0, 11.0], [1356.0, 11.5], [1374.0, 10.0], [1416.0, 10.0], [1419.0, 11.0], [1442.0, 10.0], [1456.0, 10.5], [1429.0, 21.0], [174.0, 4.0], [304.0, 14.0], [510.0, 12.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1456.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 4.0, "minX": 174.0, "maxY": 62.0, "series": [{"data": [[705.0, 57.0], [754.0, 17.0], [736.0, 58.0], [798.0, 62.0], [790.0, 58.0], [828.0, 59.0], [801.0, 61.0], [814.0, 60.0], [824.0, 57.0], [826.0, 56.0], [808.0, 56.0], [806.0, 56.0], [803.0, 54.0], [852.0, 58.0], [854.0, 57.0], [856.0, 57.0], [851.0, 58.0], [844.0, 58.0], [840.0, 59.0], [835.0, 59.0], [881.0, 56.0], [887.0, 56.0], [866.0, 57.0], [864.0, 57.0], [870.0, 57.0], [883.0, 56.0], [897.0, 20.0], [907.0, 55.0], [971.0, 23.0], [1078.0, 46.0], [1188.0, 24.0], [1168.0, 27.0], [1158.0, 54.0], [1331.0, 28.0], [1384.0, 33.0], [1394.0, 34.0], [1356.0, 37.0], [1374.0, 36.0], [1416.0, 35.0], [1419.0, 36.0], [1442.0, 35.0], [1456.0, 35.0], [174.0, 13.0], [510.0, 15.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[705.0, 20.0], [754.0, 5.0], [736.0, 21.0], [798.0, 19.0], [790.0, 33.0], [828.0, 21.0], [801.0, 24.0], [814.0, 21.0], [824.0, 24.5], [826.0, 20.0], [808.0, 28.0], [806.0, 29.0], [803.0, 18.0], [852.0, 22.0], [854.0, 22.0], [856.0, 25.0], [851.0, 20.0], [844.0, 19.0], [840.0, 17.5], [835.0, 19.0], [881.0, 21.5], [887.0, 19.0], [866.0, 19.0], [864.0, 24.5], [870.0, 20.0], [883.0, 28.0], [868.0, 15.0], [897.0, 6.0], [907.0, 18.5], [971.0, 6.0], [1078.0, 15.0], [1188.0, 6.0], [1168.0, 9.0], [1158.0, 27.0], [1167.0, 18.0], [1331.0, 9.0], [1333.0, 19.0], [1384.0, 9.0], [1394.0, 11.0], [1356.0, 11.0], [1374.0, 10.0], [1416.0, 10.0], [1419.0, 11.0], [1442.0, 10.0], [1456.0, 10.0], [1429.0, 21.0], [174.0, 4.0], [304.0, 14.0], [510.0, 12.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1456.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 833.3333333333334, "minX": 1.74637224E12, "maxY": 833.3333333333334, "series": [{"data": [[1.74637224E12, 833.3333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74637224E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 24.583333333333332, "minX": 1.74637224E12, "maxY": 693.4833333333333, "series": [{"data": [[1.74637224E12, 693.4833333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.74637224E12, 24.583333333333332]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.74637224E12, 115.26666666666667]], "isOverall": false, "label": "500", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74637224E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 139.85, "minX": 1.74637224E12, "maxY": 693.4833333333333, "series": [{"data": [[1.74637224E12, 693.4833333333333]], "isOverall": false, "label": "HTTP Request-success", "isController": false}, {"data": [[1.74637224E12, 139.85]], "isOverall": false, "label": "HTTP Request-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74637224E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 139.85, "minX": 1.74637224E12, "maxY": 693.4833333333333, "series": [{"data": [[1.74637224E12, 693.4833333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.74637224E12, 139.85]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74637224E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

