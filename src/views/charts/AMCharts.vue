<template>
    <b-row>
        <b-col sm="12" lg="6">
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Simple Column Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-simple-chart" style="height: 500px; position: relative;"></div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Layered Column Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-layeredcolumn-chart" style="height: 500px; position: relative;"></div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Bar and Line Chart Mix</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-barline-chart" style="height: 500px; position: relative;"></div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Line Chart with Scroll and Zoom</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-linescrollzomm-chart" style="height: 500px; position: relative;"></div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Radar Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-radar-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Polar Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-polar-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6" sm="12">
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Column and Line Mix Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-columnlinr-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Stacked Column Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-stackedcolumn-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Date Based Data</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-datedata-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Zoomable on Value Axis</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-zoomable-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>Polar Scatter</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-polarscatter-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="mb-0">
                    <div class="card-title">
                        <h4>3D Pie Chart</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div id="am-3dpie-chart" style="height: 500px; position: relative;">
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script setup>
import { onMounted } from 'vue';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

onMounted(() => {
    am4core.ready(() => {
        am4core.useTheme(am4themes_animated);

        // layeredcolumn-chart start //
        const simpleChart = am4core.create("am-simple-chart", am4charts.XYChart);
        simpleChart.colors.list = [am4core.color("#0dd6b8")];
        simpleChart.data = [
            { country: "USA", visits: 2025 },
            { country: "China", visits: 1882 },
            { country: "Japan", visits: 1809 },
            { country: "UK", visits: 1122 },
            { country: "France", visits: 1114 }
        ];

        const categoryAxis1 = simpleChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis1.dataFields.category = "country";
        categoryAxis1.renderer.grid.template.location = 0;
        categoryAxis1.renderer.minGridDistance = 30;
        categoryAxis1.renderer.labels.template.adapter.add("dy", (labelY, dataItem) => {
            return dataItem && dataItem.index % 2 === 0 ? labelY + 25 : labelY;
        });

        const valueAxis1 = simpleChart.yAxes.push(new am4charts.ValueAxis());

        const series1 = simpleChart.series.push(new am4charts.ColumnSeries());
        series1.dataFields.valueY = "visits";
        series1.dataFields.categoryX = "country";
        series1.name = "Visits";
        series1.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series1.columns.template.fillOpacity = 0.8;
        series1.columns.template.strokeWidth = 2;
        series1.columns.template.strokeOpacity = 1;
        // layeredcolumn-chart end //

        // simple-chart start //
        const layeredChart = am4core.create("am-layeredcolumn-chart", am4charts.XYChart);
        layeredChart.colors.list = [am4core.color("#1ee2ac"), am4core.color("#0dd6b8")];
        layeredChart.numberFormatter.numberFormat = "#.#'%'";
        layeredChart.data = [
            { country: "USA", year2004: 3.5, year2005: 4.2 },
            { country: "UK", year2004: 1.7, year2005: 3.1 },
            { country: "Canada", year2004: 2.8, year2005: 2.9 },
            { country: "Japan", year2004: 2.6, year2005: 2.3 },
            { country: "France", year2004: 1.4, year2005: 2.1 },
            { country: "Brazil", year2004: 2.6, year2005: 4.9 }
        ];

        const categoryAxis2 = layeredChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis2.dataFields.category = "country";
        categoryAxis2.renderer.grid.template.location = 0;
        categoryAxis2.renderer.minGridDistance = 30;

        const valueAxis2 = layeredChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "GDP growth rate";
        valueAxis2.title.fontWeight = 800;

        const series2_1 = layeredChart.series.push(new am4charts.ColumnSeries());
        series2_1.dataFields.valueY = "year2004";
        series2_1.dataFields.categoryX = "country";
        series2_1.clustered = false;
        series2_1.tooltipText = "GDP growth in {categoryX} (2004): [bold]{valueY}[/]";

        const series2_2 = layeredChart.series.push(new am4charts.ColumnSeries());
        series2_2.dataFields.valueY = "year2005";
        series2_2.dataFields.categoryX = "country";
        series2_2.clustered = false;
        series2_2.columns.template.width = am4core.percent(50);
        series2_2.tooltipText = "GDP growth in {categoryX} (2005): [bold]{valueY}[/]";

        layeredChart.cursor = new am4charts.XYCursor();
        layeredChart.cursor.lineX.disabled = true;
        layeredChart.cursor.lineY.disabled = true;
        // simple-chart end //

        // barline-chart start //
        const barLineChart = am4core.create("am-barline-chart", am4charts.XYChart);
        barLineChart.colors.list = [am4core.color("#0dd6b8"), am4core.color("#0dd6b8")];
        barLineChart.data = [
            { year: "2005", income: 23.5, expenses: 18.1 },
            { year: "2006", income: 26.2, expenses: 22.8 },
            { year: "2007", income: 30.1, expenses: 23.9 },
            { year: "2008", income: 29.5, expenses: 25.1 },
            { year: "2009", income: 24.6, expenses: 25 }
        ];

        const categoryAxis3 = barLineChart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis3.dataFields.category = "year";
        categoryAxis3.renderer.inversed = true;
        categoryAxis3.renderer.grid.template.location = 0;

        const valueAxis3 = barLineChart.xAxes.push(new am4charts.ValueAxis());
        valueAxis3.renderer.opposite = true;

        const incomeSeries = barLineChart.series.push(new am4charts.ColumnSeries());
        incomeSeries.dataFields.categoryY = "year";
        incomeSeries.dataFields.valueX = "income";
        incomeSeries.name = "Income";
        incomeSeries.columns.template.fillOpacity = 0.5;
        incomeSeries.columns.template.strokeOpacity = 0;
        incomeSeries.tooltipText = "Income in {categoryY}: {valueX.value}";

        const expensesSeries = barLineChart.series.push(new am4charts.LineSeries());
        expensesSeries.dataFields.categoryY = "year";
        expensesSeries.dataFields.valueX = "expenses";
        expensesSeries.name = "Expenses";
        expensesSeries.strokeWidth = 3;
        expensesSeries.tooltipText = "Expenses in {categoryY}: {valueX.value}";

        const bullet = expensesSeries.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;

        barLineChart.cursor = new am4charts.XYCursor();
        barLineChart.cursor.behavior = "zoomY";
        barLineChart.legend = new am4charts.Legend();
        // barline-chart end //

        // linescrollzomm-chart start //
        const lineScrollZoomChart = am4core.create("am-linescrollzomm-chart", am4charts.XYChart);
        lineScrollZoomChart.colors.list = [am4core.color("#0dd6b8")];
        lineScrollZoomChart.data = generateData();

        const dateAxisLine = lineScrollZoomChart.xAxes.push(new am4charts.DateAxis());
        dateAxisLine.renderer.minGridDistance = 50;

        lineScrollZoomChart.yAxes.push(new am4charts.ValueAxis());

        const lineSeries = lineScrollZoomChart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.valueY = "visits";
        lineSeries.dataFields.dateX = "date";
        lineSeries.strokeWidth = 2;
        lineSeries.minBulletDistance = 10;
        lineSeries.tooltipText = "{valueY}";
        lineSeries.tooltip.pointerOrientation = "vertical";
        lineSeries.tooltip.background.cornerRadius = 20;
        lineSeries.tooltip.background.fillOpacity = 0.5;
        lineSeries.tooltip.label.padding(12, 12, 12, 12);

        lineScrollZoomChart.scrollbarX = new am4charts.XYChartScrollbar();
        lineScrollZoomChart.scrollbarX.series.push(lineSeries);

        lineScrollZoomChart.cursor = new am4charts.XYCursor();
        lineScrollZoomChart.cursor.xAxis = dateAxisLine;
        lineScrollZoomChart.cursor.snapToSeries = lineSeries;

        // Data Generation for Line Chart
        function generateData() {
            const data = [];
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 1000);
            let value = 1200;

            for (let i = 0; i < 500; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
                data.push({ date, visits: value });
            }

            return data;
        }
        // linescrollzomm-chart end //

        // radar-chart start //
        const radarChart = am4core.create("am-radar-chart", am4charts.RadarChart);
        radarChart.colors.list = [am4core.color("#0dd6b8")];
        radarChart.data = [
            { country: "Lithuania", litres: 501 },
            { country: "Czechia", litres: 301 },
            { country: "Ireland", litres: 266 },
            { country: "Germany", litres: 165 },
            { country: "Australia", litres: 139 },
            { country: "Austria", litres: 336 },
            { country: "UK", litres: 290 },
            { country: "Belgium", litres: 325 },
            { country: "The Netherlands", litres: 40 }
        ];

        const categoryAxisRadar = radarChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisRadar.dataFields.category = "country";

        const valueAxisRadar = radarChart.yAxes.push(new am4charts.ValueAxis());
        valueAxisRadar.renderer.axisFills.template.fill = radarChart.colors.getIndex(2);
        valueAxisRadar.renderer.axisFills.template.fillOpacity = 0.05;

        const radarSeries = radarChart.series.push(new am4charts.RadarSeries());
        radarSeries.dataFields.valueY = "litres";
        radarSeries.dataFields.categoryX = "country";
        radarSeries.name = "Sales";
        radarSeries.strokeWidth = 3;
        // radar-chart end //

        // polar-chart start //
        const polarChart = am4core.create("am-polar-chart", am4charts.RadarChart);
        polarChart.data = [
            { direction: "N", value: 8 },
            { direction: "NE", value: 9 },
            { direction: "E", value: 4.5 },
            { direction: "SE", value: 3.5 },
            { direction: "S", value: 9.2 },
            { direction: "SW", value: 8.4 },
            { direction: "W", value: 11.1 },
            { direction: "NW", value: 10 }
        ];

        const categoryAxisPolar = polarChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisPolar.dataFields.category = "direction";

        polarChart.yAxes.push(new am4charts.ValueAxis());

        const rangeNW = categoryAxisPolar.axisRanges.create();
        rangeNW.category = "NW";
        rangeNW.endCategory = "NW";
        rangeNW.axisFill.fill = am4core.color("#0dd6b8");
        rangeNW.axisFill.fillOpacity = 0.3;

        const rangeN = categoryAxisPolar.axisRanges.create();
        rangeN.category = "N";
        rangeN.endCategory = "N";
        rangeN.axisFill.fill = am4core.color("#0dd6b8");
        rangeN.axisFill.fillOpacity = 0.3;

        const rangeSE_SW = categoryAxisPolar.axisRanges.create();
        rangeSE_SW.category = "SE";
        rangeSE_SW.endCategory = "SW";
        rangeSE_SW.axisFill.fill = am4core.color("#fbc647");
        rangeSE_SW.axisFill.fillOpacity = 0.3;
        rangeSE_SW.locations.endCategory = 0;

        const radarSeriesPolar = polarChart.series.push(new am4charts.RadarSeries());
        radarSeriesPolar.dataFields.valueY = "value";
        radarSeriesPolar.dataFields.categoryX = "direction";
        radarSeriesPolar.name = "Wind direction";
        radarSeriesPolar.strokeWidth = 3;
        radarSeriesPolar.fillOpacity = 0.2;
        // polar-chart end //

        // columnlinr-chart start //
        const columnLineChart = am4core.create("am-columnlinr-chart", am4charts.XYChart);
        columnLineChart.colors.list = [am4core.color("#0dd6b8")];
        columnLineChart.exporting.menu = new am4core.ExportMenu();
        columnLineChart.data = [
            { year: "2009", income: 23.5, expenses: 21.1 },
            { year: "2010", income: 26.2, expenses: 30.5 },
            { year: "2011", income: 30.1, expenses: 34.9 },
            { year: "2012", income: 29.5, expenses: 31.1 },
            { year: "2013", income: 30.6, expenses: 28.2, lineDash: "5,5" },
            { year: "2014", income: 34.1, expenses: 32.9, strokeWidth: 1, columnDash: "5,5", fillOpacity: 0.2, additional: "(projection)" }
        ];

        const categoryAxis5 = columnLineChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis5.dataFields.category = "year";
        categoryAxis5.renderer.minGridDistance = 30;

        const valueAxis6 = columnLineChart.yAxes.push(new am4charts.ValueAxis());

        const columnSeries = columnLineChart.series.push(new am4charts.ColumnSeries());
        columnSeries.name = "Income";
        columnSeries.dataFields.valueY = "income";
        columnSeries.dataFields.categoryX = "year";
        columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
        columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
        columnSeries.columns.template.propertyFields.stroke = "stroke";
        columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
        columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
        columnSeries.tooltip.label.textAlign = "middle";

        const lineSeries1 = columnLineChart.series.push(new am4charts.LineSeries());
        lineSeries1.name = "Expenses";
        lineSeries1.dataFields.valueY = "expenses";
        lineSeries1.dataFields.categoryX = "year";
        lineSeries1.stroke = am4core.color("#0dd6b8");
        lineSeries1.strokeWidth = 3;
        lineSeries1.propertyFields.strokeDasharray = "lineDash";
        lineSeries1.tooltip.label.textAlign = "middle";

        const bullets = lineSeries1.bullets.push(new am4charts.Bullet());
        bullets.fill = am4core.color("#fdd400");
        bullets.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";

        const circle = bullets.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color("#fff");
        circle.strokeWidth = 3;
        // columnlinr-chart end //

        // stackedcolumn-chart Start //
        const stackedColumnChart = am4core.create("am-stackedcolumn-chart", am4charts.XYChart);
        stackedColumnChart.colors.list = [am4core.color("#0dd6b8"), am4core.color("#0dd6b8"), am4core.color("#1ee2ac")];
        stackedColumnChart.data = [
            { year: "2016", europe: 2.5, namerica: 2.5, asia: 2.1, lamerica: 0.3, meast: 0.2 },
            { year: "2018", europe: 2.8, namerica: 2.9, asia: 2.4, lamerica: 0.3, meast: 0.3 }
        ];

        const categoryAxis4 = stackedColumnChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis4.dataFields.category = "year";
        categoryAxis4.renderer.grid.template.location = 0;

        const valueAxis5 = stackedColumnChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis5.renderer.inside = true;
        valueAxis5.renderer.labels.template.disabled = true;
        valueAxis5.min = 0;

        const createSeries = (valueField, name) => {
            const series = stackedColumnChart.series.push(new am4charts.ColumnSeries());
            series.name = name;
            series.dataFields.valueY = valueField;
            series.dataFields.categoryX = "year";
            series.sequencedInterpolation = true;
            series.stacked = true;
            series.columns.template.width = am4core.percent(60);
            series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

            const labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = "{valueY}";
            labelBullet.locationY = 0.5;

            return series;
        };

        createSeries("europe", "Europe");
        createSeries("namerica", "North America");
        createSeries("asia", "Asia-Pacific");

        stackedColumnChart.legend = new am4charts.Legend();
        // stackedcolumn-chart end //

        // datedata-chart start //
        let chartDatedata = am4core.create('am-datedata-chart', am4charts.XYChart);
        chartDatedata.colors.list = [am4core.color('#0dd6b8')];

        chartDatedata.data = [
            { date: '2012-07-27', value: 13 },
            { date: '2012-07-28', value: 11 },
            { date: '2012-07-29', value: 15 },
            { date: '2012-07-30', value: 16 },
            { date: '2012-07-31', value: 18 },
            { date: '2012-08-01', value: 13 },
            { date: '2012-08-02', value: 22 },
            { date: '2012-08-03', value: 23 },
            { date: '2012-08-04', value: 20 },
            { date: '2012-08-05', value: 17 },
            { date: '2012-08-06', value: 16 },
            { date: '2012-08-07', value: 18 },
            { date: '2012-08-08', value: 21 },
            { date: '2012-08-09', value: 26 },
            { date: '2012-08-10', value: 24 },
            { date: '2012-08-11', value: 29 },
            { date: '2012-08-12', value: 32 },
            { date: '2012-08-13', value: 18 },
            { date: '2012-08-14', value: 24 },
            { date: '2012-08-15', value: 22 },
            { date: '2012-08-16', value: 18 },
            { date: '2012-08-17', value: 19 },
            { date: '2012-08-18', value: 14 },
            { date: '2012-08-19', value: 15 },
            { date: '2012-08-20', value: 12 },
            { date: '2012-08-21', value: 8 },
            { date: '2012-08-22', value: 9 },
            { date: '2012-08-23', value: 8 },
            { date: '2012-08-24', value: 7 },
            { date: '2012-08-25', value: 5 },
            { date: '2012-08-26', value: 11 },
            { date: '2012-08-27', value: 13 },
            { date: '2012-08-28', value: 18 },
            { date: '2012-08-29', value: 20 },
            { date: '2012-08-30', value: 29 },
            { date: '2012-08-31', value: 33 },
            { date: '2012-09-01', value: 42 },
            { date: '2012-09-02', value: 35 },
            { date: '2012-09-03', value: 31 },
            { date: '2012-09-04', value: 47 },
            { date: '2012-09-05', value: 52 },
            { date: '2012-09-06', value: 46 },
            { date: '2012-09-07', value: 41 },
            { date: '2012-09-08', value: 43 },
            { date: '2012-09-09', value: 40 },
            { date: '2012-09-10', value: 39 },
            { date: '2012-09-11', value: 34 },
            { date: '2012-09-12', value: 29 },
            { date: '2012-09-13', value: 34 },
            { date: '2012-09-14', value: 37 },
            { date: '2012-09-15', value: 42 },
            { date: '2012-09-16', value: 49 },
            { date: '2012-09-17', value: 46 },
            { date: '2012-09-18', value: 47 },
            { date: '2012-09-19', value: 55 },
            { date: '2012-09-20', value: 59 },
            { date: '2012-09-21', value: 58 },
            { date: '2012-09-22', value: 57 },
            { date: '2012-09-23', value: 61 },
            { date: '2012-09-24', value: 59 },
            { date: '2012-09-25', value: 67 },
            { date: '2012-09-26', value: 65 },
            { date: '2012-09-27', value: 61 },
            { date: '2012-09-28', value: 66 },
            { date: '2012-09-29', value: 69 },
            { date: '2012-09-30', value: 71 },
            { date: '2012-10-01', value: 67 },
            { date: '2012-10-02', value: 63 },
            { date: '2012-10-03', value: 46 },
            { date: '2012-10-04', value: 32 },
            { date: '2012-10-05', value: 21 },
            { date: '2012-10-06', value: 18 },
            { date: '2012-10-07', value: 21 },
            { date: '2012-10-08', value: 28 },
            { date: '2012-10-09', value: 27 },
            { date: '2012-10-10', value: 36 },
            { date: '2012-10-11', value: 33 },
            { date: '2012-10-12', value: 31 },
            { date: '2012-10-13', value: 30 },
            { date: '2012-10-14', value: 34 },
            { date: '2012-10-15', value: 38 },
            { date: '2012-10-16', value: 37 },
            { date: '2012-10-17', value: 44 },
            { date: '2012-10-18', value: 49 },
            { date: '2012-10-19', value: 53 },
            { date: '2012-10-20', value: 57 },
            { date: '2012-10-21', value: 60 },
            { date: '2012-10-22', value: 61 },
            { date: '2012-10-23', value: 69 },
            { date: '2012-10-24', value: 67 },
            { date: '2012-10-25', value: 72 },
            { date: '2012-10-26', value: 77 },
            { date: '2012-10-27', value: 75 },
            { date: '2012-10-28', value: 70 },
            { date: '2012-10-29', value: 72 },
            { date: '2012-10-30', value: 70 },
            { date: '2012-10-31', value: 72 },
            { date: '2012-11-01', value: 73 },
            { date: '2012-11-02', value: 67 },
            { date: '2012-11-03', value: 68 },
            { date: '2012-11-04', value: 65 },
            { date: '2012-11-05', value: 71 },
            { date: '2012-11-06', value: 75 },
            { date: '2012-11-07', value: 74 },
            { date: '2012-11-08', value: 71 },
            { date: '2012-11-09', value: 76 },
            { date: '2012-11-10', value: 77 },
            { date: '2012-11-11', value: 81 },
            { date: '2012-11-12', value: 83 },
            { date: '2012-11-13', value: 80 },
            { date: '2012-11-14', value: 81 },
            { date: '2012-11-15', value: 87 },
            { date: '2012-11-16', value: 82 },
            { date: '2012-11-17', value: 86 },
            { date: '2012-11-18', value: 80 },
            { date: '2012-11-19', value: 87 },
            { date: '2012-11-20', value: 83 },
            { date: '2012-11-21', value: 85 },
            { date: '2012-11-22', value: 84 },
            { date: '2012-11-23', value: 82 },
            { date: '2012-11-24', value: 73 },
            { date: '2012-11-25', value: 71 },
            { date: '2012-11-26', value: 75 },
            { date: '2012-11-27', value: 79 },
            { date: '2012-11-28', value: 70 },
            { date: '2012-11-29', value: 73 },
            { date: '2012-11-30', value: 61 },
            { date: '2012-12-01', value: 62 },
            { date: '2012-12-02', value: 66 },
            { date: '2012-12-03', value: 65 },
            { date: '2012-12-04', value: 73 },
            { date: '2012-12-05', value: 79 },
            { date: '2012-12-06', value: 78 },
            { date: '2012-12-07', value: 78 },
            { date: '2012-12-08', value: 78 },
            { date: '2012-12-09', value: 74 },
            { date: '2012-12-10', value: 73 },
            { date: '2012-12-11', value: 75 },
            { date: '2012-12-12', value: 70 },
            { date: '2012-12-13', value: 77 },
            { date: '2012-12-14', value: 67 },
            { date: '2012-12-15', value: 62 },
            { date: '2012-12-16', value: 64 },
            { date: '2012-12-17', value: 61 },
            { date: '2012-12-18', value: 59 },
            { date: '2012-12-19', value: 53 },
            { date: '2012-12-20', value: 54 },
            { date: '2012-12-21', value: 56 },
            { date: '2012-12-22', value: 59 },
            { date: '2012-12-23', value: 58 },
            { date: '2012-12-24', value: 55 },
            { date: '2012-12-25', value: 52 },
            { date: '2012-12-26', value: 54 },
            { date: '2012-12-27', value: 50 },
            { date: '2012-12-28', value: 50 },
            { date: '2012-12-29', value: 51 },
            { date: '2012-12-30', value: 52 },
            { date: '2012-12-31', value: 58 },
        ];

        let dateAxisDatedata = chartDatedata.xAxes.push(new am4charts.DateAxis());
        dateAxisDatedata.renderer.grid.template.location = 0;
        dateAxisDatedata.renderer.minGridDistance = 30;

        let valueAxis = chartDatedata.yAxes.push(new am4charts.ValueAxis());

        let seriesDatedata = chartDatedata.series.push(new am4charts.LineSeries());
        seriesDatedata.dataFields.valueY = 'value';
        seriesDatedata.dataFields.dateX = 'date';
        seriesDatedata.tooltipText = '{value}';

        seriesDatedata.tooltip.background.cornerRadius = 20;
        seriesDatedata.tooltip.background.strokeOpacity = 0;
        seriesDatedata.tooltip.pointerOrientation = 'vertical';
        seriesDatedata.tooltip.label.minWidth = 40;
        seriesDatedata.tooltip.label.minHeight = 40;
        seriesDatedata.tooltip.label.textAlign = 'middle';
        
        chartDatedata.cursor = new am4charts.XYCursor();
        chartDatedata.cursor.behavior = 'panXY';
        chartDatedata.cursor.xAxis = dateAxisDatedata;
        chartDatedata.cursor.snapToSeries = seriesDatedata;

        chartDatedata.scrollbarY = new am4core.Scrollbar();
        chartDatedata.scrollbarY.marginRight = 0;

    })
    // datedata-chart end //

    // zoomable-chart start //
    let chartZoomable = am4core.create("am-zoomable-chart", am4charts.XYChart);

    chartZoomable.colors.list = [am4core.color("#0dd6b8")];

    chartZoomable.data = [
        {
            date: "2012-07-27",
            value: 13
        }, {
            date: "2012-07-28",
            value: 11
        }, {
            date: "2012-07-29",
            value: 15
        }, {
            date: "2012-07-30",
            value: 16
        }, {
            date: "2012-07-31",
            value: 18
        }, {
            date: "2012-08-01",
            value: 13
        }, {
            date: "2012-08-02",
            value: 22
        }, {
            date: "2012-08-03",
            value: 23
        }, {
            date: "2012-08-04",
            value: 20
        }, {
            date: "2012-08-05",
            value: 17
        }, {
            date: "2012-08-06",
            value: 16
        }, {
            date: "2012-08-07",
            value: 18
        }, {
            date: "2012-08-08",
            value: 21
        }, {
            date: "2012-08-09",
            value: 26
        }, {
            date: "2012-08-10",
            value: 24
        }, {
            date: "2012-08-11",
            value: 29
        }, {
            date: "2012-08-12",
            value: 32
        }, {
            date: "2012-08-13",
            value: 18
        }, {
            date: "2012-08-14",
            value: 24
        }, {
            date: "2012-08-15",
            value: 22
        }, {
            date: "2012-08-16",
            value: 18
        }, {
            date: "2012-08-17",
            value: 19
        }, {
            date: "2012-08-18",
            value: 14
        }, {
            date: "2012-08-19",
            value: 15
        }, {
            date: "2012-08-20",
            value: 12
        }, {
            date: "2012-08-21",
            value: 8
        }, {
            date: "2012-08-22",
            value: 9
        }, {
            date: "2012-08-23",
            value: 8
        }, {
            date: "2012-08-24",
            value: 7
        }, {
            date: "2012-08-25",
            value: 5
        }, {
            date: "2012-08-26",
            value: 11
        }, {
            date: "2012-08-27",
            value: 13
        }, {
            date: "2012-08-28",
            value: 18
        }, {
            date: "2012-08-29",
            value: 20
        }, {
            date: "2012-08-30",
            value: 29
        }, {
            date: "2012-08-31",
            value: 33
        }, {
            date: "2012-09-01",
            value: 42
        }, {
            date: "2012-09-02",
            value: 35
        }, {
            date: "2012-09-03",
            value: 31
        }, {
            date: "2012-09-04",
            value: 47
        }, {
            date: "2012-09-05",
            value: 52
        }, {
            date: "2012-09-06",
            value: 46
        }, {
            date: "2012-09-07",
            value: 41
        }, {
            date: "2012-09-08",
            value: 43
        }, {
            date: "2012-09-09",
            value: 40
        }, {
            date: "2012-09-10",
            value: 39
        }, {
            date: "2012-09-11",
            value: 34
        }, {
            date: "2012-09-12",
            value: 29
        }, {
            date: "2012-09-13",
            value: 34
        }, {
            date: "2012-09-14",
            value: 37
        }, {
            date: "2012-09-15",
            value: 42
        }, {
            date: "2012-09-16",
            value: 49
        }, {
            date: "2012-09-17",
            value: 46
        }, {
            date: "2012-09-18",
            value: 47
        }, {
            date: "2012-09-19",
            value: 55
        }, {
            date: "2012-09-20",
            value: 59
        }, {
            date: "2012-09-21",
            value: 58
        }, {
            date: "2012-09-22",
            value: 57
        }, {
            date: "2012-09-23",
            value: 61
        }, {
            date: "2012-09-24",
            value: 59
        }, {
            date: "2012-09-25",
            value: 67
        }, {
            date: "2012-09-26",
            value: 65
        }, {
            date: "2012-09-27",
            value: 61
        }, {
            date: "2012-09-28",
            value: 66
        }, {
            date: "2012-09-29",
            value: 69
        }, {
            date: "2012-09-30",
            value: 71
        }, {
            date: "2012-10-01",
            value: 67
        }, {
            date: "2012-10-02",
            value: 63
        }, {
            date: "2012-10-03",
            value: 46
        }, {
            date: "2012-10-04",
            value: 32
        }, {
            date: "2012-10-05",
            value: 21
        }, {
            date: "2012-10-06",
            value: 18
        }, {
            date: "2012-10-07",
            value: 21
        }, {
            date: "2012-10-08",
            value: 28
        }, {
            date: "2012-10-09",
            value: 27
        }, {
            date: "2012-10-10",
            value: 36
        }, {
            date: "2012-10-11",
            value: 33
        }, {
            date: "2012-10-12",
            value: 31
        }, {
            date: "2012-10-13",
            value: 30
        }, {
            date: "2012-10-14",
            value: 34
        }, {
            date: "2012-10-15",
            value: 38
        }, {
            date: "2012-10-16",
            value: 37
        }, {
            date: "2012-10-17",
            value: 44
        }, {
            date: "2012-10-18",
            value: 49
        }, {
            date: "2012-10-19",
            value: 53
        }, {
            date: "2012-10-20",
            value: 57
        }, {
            date: "2012-10-21",
            value: 60
        }, {
            date: "2012-10-22",
            value: 61
        }, {
            date: "2012-10-23",
            value: 69
        }, {
            date: "2012-10-24",
            value: 67
        }, {
            date: "2012-10-25",
            value: 72
        }, {
            date: "2012-10-26",
            value: 77
        }, {
            date: "2012-10-27",
            value: 75
        }, {
            date: "2012-10-28",
            value: 70
        }, {
            date: "2012-10-29",
            value: 72
        }, {
            date: "2012-10-30",
            value: 70
        }, {
            date: "2012-10-31",
            value: 72
        }, {
            date: "2012-11-01",
            value: 73
        }, {
            date: "2012-11-02",
            value: 67
        }, {
            date: "2012-11-03",
            value: 68
        }, {
            date: "2012-11-04",
            value: 65
        }, {
            date: "2012-11-05",
            value: 71
        }, {
            date: "2012-11-06",
            value: 75
        }, {
            date: "2012-11-07",
            value: 74
        }, {
            date: "2012-11-08",
            value: 71
        }, {
            date: "2012-11-09",
            value: 76
        }, {
            date: "2012-11-10",
            value: 77
        }, {
            date: "2012-11-11",
            value: 81
        }, {
            date: "2012-11-12",
            value: 83
        }, {
            date: "2012-11-13",
            value: 80
        }, {
            date: "2012-11-18",
            value: 80
        }, {
            date: "2012-11-19",
            value: 87
        }, {
            date: "2012-11-20",
            value: 83
        }, {
            date: "2012-11-21",
            value: 85
        }, {
            date: "2012-11-22",
            value: 84
        }, {
            date: "2012-11-23",
            value: 82
        }, {
            date: "2012-11-24",
            value: 73
        }, {
            date: "2012-11-25",
            value: 71
        }, {
            date: "2012-11-26",
            value: 75
        }, {
            date: "2012-11-27",
            value: 79
        }, {
            date: "2012-11-28",
            value: 70
        }, {
            date: "2012-11-29",
            value: 73
        }, {
            date: "2012-11-30",
            value: 61
        }, {
            date: "2012-12-01",
            value: 62
        }, {
            date: "2012-12-02",
            value: 66
        }, {
            date: "2012-12-03",
            value: 65
        }, {
            date: "2012-12-04",
            value: 73
        }, {
            date: "2012-12-05",
            value: 79
        }, {
            date: "2012-12-06",
            value: 78
        }, {
            date: "2012-12-07",
            value: 78
        }, {
            date: "2012-12-08",
            value: 78
        }, {
            date: "2012-12-09",
            value: 74
        }, {
            date: "2012-12-10",
            value: 73
        }, {
            date: "2012-12-11",
            value: 75
        }, {
            date: "2012-12-12",
            value: 70
        }, {
            date: "2012-12-13",
            value: 77
        }, {
            date: "2012-12-14",
            value: 67
        }, {
            date: "2012-12-15",
            value: 62
        }, {
            date: "2012-12-16",
            value: 64
        }, {
            date: "2012-12-17",
            value: 61
        }, {
            date: "2012-12-18",
            value: 59
        }, {
            date: "2012-12-19",
            value: 53
        }, {
            date: "2012-12-20",
            value: 54
        }, {
            date: "2012-12-21",
            value: 56
        }, {
            date: "2012-12-22",
            value: 59
        }, {
            date: "2012-12-23",
            value: 58
        }, {
            date: "2012-12-24",
            value: 55
        }, {
            date: "2012-12-25",
            value: 52
        }, {
            date: "2012-12-26",
            value: 54
        }, {
            date: "2012-12-27",
            value: 50
        }, {
            date: "2012-12-28",
            value: 50
        }, {
            date: "2012-12-29",
            value: 51
        }, {
            date: "2012-12-30",
            value: 52
        }, {
            date: "2012-12-31",
            value: 58
        }, {
            date: "2013-01-01",
            value: 60
        }, {
            date: "2013-01-02",
            value: 67
        }, {
            date: "2013-01-03",
            value: 64
        }, {
            date: "2013-01-04",
            value: 66
        }, {
            date: "2013-01-05",
            value: 60
        }, {
            date: "2013-01-06",
            value: 63
        }, {
            date: "2013-01-07",
            value: 61
        }, {
            date: "2013-01-08",
            value: 60
        }, {
            date: "2013-01-09",
            value: 65
        }, {
            date: "2013-01-10",
            value: 75
        }, {
            date: "2013-01-11",
            value: 77
        }, {
            date: "2013-01-12",
            value: 78
        }, {
            date: "2013-01-13",
            value: 70
        }, {
            date: "2013-01-14",
            value: 70
        }, {
            date: "2013-01-15",
            value: 73
        }, {
            date: "2013-01-16",
            value: 71
        }, {
            date: "2013-01-17",
            value: 74
        }, {
            date: "2013-01-18",
            value: 78
        }, {
            date: "2013-01-19",
            value: 85
        }, {
            date: "2013-01-20",
            value: 82
        }, {
            date: "2013-01-21",
            value: 83
        }, {
            date: "2013-01-22",
            value: 88
        }, {
            date: "2013-01-23",
            value: 85
        }, {
            date: "2013-01-24",
            value: 85
        }, {
            date: "2013-01-25",
            value: 80
        }, {
            date: "2013-01-26",
            value: 87
        }, {
            date: "2013-01-27",
            value: 84
        }, {
            date: "2013-01-28",
            value: 83
        }, {
            date: "2013-01-29",
            value: 84
        }, {
            date: "2013-01-30",
            value: 81
        }
    ];

    let dateAxis = chartZoomable.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    chartZoomable.yAxes.push(new am4charts.ValueAxis());

    let series = chartZoomable.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.fillOpacity = 0.5;

    chartZoomable.scrollbarY = new am4core.Scrollbar();
    chartZoomable.scrollbarY.marginLeft = 0;

    chartZoomable.cursor = new am4charts.XYCursor();
    chartZoomable.cursor.behavior = "zoomY";
    chartZoomable.cursor.lineX.disabled = true;
    // zoomable-chart end //

    // 3dpie-chart start //
    const pieChart = am4core.create("am-3dpie-chart", am4charts.PieChart3D);
    pieChart.hiddenState.properties.opacity = 0;

    pieChart.legend = new am4charts.Legend();
    pieChart.data = [
        { country: 'Lithuania', litres: 501.9 },
        { country: 'Germany', litres: 165.8 },
        { country: 'Australia', litres: 139.9 },
        { country: 'Austria', litres: 128.3 },
        { country: 'UK', litres: 99 },
        { country: 'Belgium', litres: 60 }
    ];

    const pieSeries = pieChart.series.push(new am4charts.PieSeries3D());
    pieSeries.colors.list = [
        am4core.color('#0dd6b8'),
        am4core.color('#fbc647'),
        am4core.color('#ff7750'),
        am4core.color('#6ce6f4'),
        am4core.color('#1ee2ac'),
        am4core.color('#c8c8c8')
    ];
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'country';
    // 3dpie-chart end //

    // polarscatter-chart start //
    const chart = am4core.create("am-polarscatter-chart", am4charts.RadarChart);
    chart.colors.list = [
        am4core.color("#0dd6b8"),
        am4core.color("#0dd6b8"),
        am4core.color("#1ee2ac")
    ];

    chart.data = [
        { country: "Lithuania", litres: 501, units: 250 },
        { country: "Czech Republic", litres: 301, units: 222 },
        { country: "Ireland", litres: 266, units: 179 },
        { country: "Germany", litres: 165, units: 298 },
        { country: "Australia", litres: 139, units: 299 }
    ];

    chart.xAxes.push(new am4charts.ValueAxis());
    chart.yAxes.push(new am4charts.ValueAxis());

    // First Series
    let series6 = chart.series.push(new am4charts.RadarSeries());
    series6.name = "Series #1";
    series6.dataFields.valueX = "x";
    series6.dataFields.valueY = "y";
    series6.data = [
        { x: 83, y: 5.1 }, { x: 44, y: 5.8 }, { x: 76, y: 9 },
        { x: 2, y: 1.4 }, { x: 100, y: 8.3 }, { x: 96, y: 1.7 },
        { x: 68, y: 3.9 }, { x: 0, y: 3 }, { x: 100, y: 4.1 },
        { x: 16, y: 5.5 }, { x: 71, y: 6.8 }, { x: 100, y: 7.9 },
        { x: 35, y: 8 }, { x: 44, y: 6 }, { x: 64, y: 0.7 },
        { x: 53, y: 3.3 }, { x: 92, y: 4.1 }, { x: 43, y: 7.3 },
        { x: 15, y: 7.5 }, { x: 43, y: 4.3 }, { x: 90, y: 9.9 }
    ];
    series6.bullets.push(new am4charts.CircleBullet());
    series6.strokeOpacity = 0;
    series6.sequencedInterpolation = true;
    series6.sequencedInterpolationDelay = 10;

    // Second Series
    let series2 = chart.series.push(new am4charts.RadarSeries());
    series2.name = "Series #2";
    series2.dataFields.valueX = "x";
    series2.dataFields.valueY = "y";
    series2.data = [
        { x: 178, y: 1.3 }, { x: 129, y: 3.4 }, { x: 99, y: 2.4 },
        { x: 80, y: 9.9 }, { x: 118, y: 9.4 }, { x: 103, y: 8.7 },
        { x: 91, y: 4.2 }, { x: 151, y: 1.2 }, { x: 168, y: 5.2 },
        { x: 168, y: 1.6 }, { x: 152, y: 1.2 }, { x: 138, y: 7.7 },
        { x: 107, y: 3.9 }, { x: 124, y: 0.7 }, { x: 130, y: 2.6 },
        { x: 86, y: 9.2 }, { x: 169, y: 7.5 }, { x: 122, y: 9.9 },
        { x: 100, y: 3.8 }, { x: 172, y: 4.1 }, { x: 140, y: 7.3 },
        { x: 161, y: 2.3 }, { x: 141, y: 0.9 }
    ];
    series2.bullets.push(new am4charts.CircleBullet());
    series2.strokeOpacity = 0;
    series2.sequencedInterpolation = true;
    series2.sequencedInterpolationDelay = 10;

    // Third Series
    let series3 = chart.series.push(new am4charts.RadarSeries());
    series3.name = "Series #3";
    series3.dataFields.valueX = "x";
    series3.dataFields.valueY = "y";
    series3.data = [
        { x: 419, y: 4.9 }, { x: 417, y: 5.5 }, { x: 434, y: 0.1 },
        { x: 344, y: 2.5 }, { x: 279, y: 7.5 }, { x: 307, y: 8.4 },
        { x: 279, y: 9 }, { x: 220, y: 8.4 }, { x: 201, y: 9.7 },
        { x: 288, y: 1.2 }, { x: 333, y: 7.4 }, { x: 308, y: 1.9 },
        { x: 330, y: 8 }, { x: 408, y: 1.7 }, { x: 274, y: 0.8 },
        { x: 296, y: 3.1 }, { x: 279, y: 4.3 }, { x: 379, y: 5.6 },
        { x: 175, y: 6.8 }
    ];
    series3.bullets.push(new am4charts.CircleBullet());
    series3.strokeOpacity = 0;
    series3.sequencedInterpolation = true;
    series3.sequencedInterpolationDelay = 10;

    // Add legend and cursor
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.RadarCursor();
    // polarscatter-chart end //
});
</script>

<style scoped>
/* Add any styles for the component here */
</style>