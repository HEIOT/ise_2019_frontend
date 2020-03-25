# HEIOT

HEIOT is an IoT platform to manage IoT devices and their delivered data.
The user can overlook all devices in lists grouped by the actual condition distinguishing between the need of the platform's manager to take further actions. The user is enabled to create tags and masterdata by her-/himself in order to group the devices semantically.
Moreover, there is a detailed view of each device where all data is displayed and visualized by interactive charts and tables.
The platform also includes an analytical service to detect anomalies in the device's data.

HEIOT was a project ("ISE project") implemented by a group of students from the University of Heidelberg.

## Setting up HEIOT

### Deploying the platform

To deploy HEIOT please follow instructions from <https://github.com/HEIOT/ise_2019_deployment>

### Starting the platform locally

1. [Set up docker based development environment](https://github.com/HEIOT/ise_2019_dev_infra)
2. Start application

    ```bash
    npm run docker-up
    ```

3. In your browser go to http://ise.local/

## Tooling

For a smooth developing experience, it is recommended to use VS Code. Install the following VS Code plugins for code formatting and linting:

-   Prettier (by Esben Petersen)
-   TSLint (by Microsoft)
-   Vetur (by Pine Wu)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run docker-build
npm run docker-up
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Usage of the platform

[overview]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/overview.png 'Overview'
[register]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/register.png 'Register device view'
[management]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/management.png 'Masterdata and tag management view'
[device_anomaly]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/device_anomaly.png 'Anomaly table'
[device_table]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/device_table.png 'delivered data of device'
[device_profile]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/device_profile.png 'device profile'
[device_line_chart]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/device_line_chart.png 'line chart of delivered data'
[device_bar_chart]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/device_bar_chart.png 'delivered data of specific time'
[device_editor]: https://github.com/HEIOT/ise_2019_frontend/blob/master/dist/img/device_editor.png 'editing device view'

### Device Overview

![alt text][overview]

1. State Cards
   The State Cards show the current number of devices per state for all four states. Eight devices for air quality management are preconfigured. The State Cards differentiate between the states 'Urgent', 'Warning', 'OK' and 'Information'. A state can change, if an anomaly occurs. By clicking a State Card, you can see the devices belonging to a selected state in the Device List.

2. Filter Bar
   You can use the Filter Bar to filter the device list by tags, masterdata categories and values, IDs, device IDs and device names. Autocompletion is activated for filtering tags and masterdata.

3. Device List
   The Device List shows all devices belonging to the selected Status Card. You can navigate into the Detail View of a device by clicking its information button. You also can navigate by selecting the anamoly type in the head of the list.

4. Information Card
   At the bottom of the Overview page, you can find the Information Card with the title 'Initiate further steps'. If you click 'Send Mail', your primary mail program opens with a generated text, which contains a list of all devices with state 'urgent' or 'warning'.

### Masterdata and Tag management

![alt text][management]

You reach the Masterdata and Tag Management by clicking 'Management' in the navigation bar.

1. Masterdata Management
   You can add a new masterdata category by typing its name into the input field and clicking the plus button. Existing categories can be renamed and deleted in the list below.

2. Tag Management
   You can add a new tag by typing its name into the input field and clicking the plus button. Existing categories can be deleted in the list below.

### Device Registration

![alt text][register]

You reach the Device Registration by clicking 'Register Device' in the navigation bar.

1. Basic Attributes
   Both the device ID and the device name are mandatory attributes of a device.

2. Masterdata
   You select a masterdata category in the dropdown, type the masterdata value and click the plus button to add a new masterdata to the device. The button 'Add Masterdata +' opens the Masterdata Management in a drawer.

3. Tags
   You select the tags of the device in the dropdown. The button 'Add Tag +' opens the Tag Management in a drawer.

### Detail View

The Detail View of a device can be reached by clicking the information button of the device in the Device List of the Device Overview. The title shows the name of the selected device.

#### Device Profile

![alt text][device_profile]

The Detail View starts with the Device Profile, which shows the ID, device ID, tags and masterdata of the selected device. You can click the pencil button in the upper-right corner to change the device parameters in the Device Editor. By clicking the bin at the upper-right corner, you can delete a device. The multiswitch under the title 'Device Profile' allows to switch the state of the selected device manually.

#### Device Editor

![alt text][device_editor]

By clicking the pencil button in the upper-right corner of the Device Profile, the Device Editor opens in a drawer. The Device Editor allows to edit the device ID, name, masterdata and tags of a device. By clicking 'Add Masterdata +', the Masterdata Management opens in a drawer. By clicking 'Add Tags +', the Tag Management opens in a drawer.

#### Anomalies

![alt text][device_anomaly]

All anomalies of a device are listed in a table. The number of all detected anomalies is shown right to the title 'Anomalies'. For each anomaly, the table shows the timestamp, the affected measure (the air quality attribute), the type of the anomaly and a button to jump to the Data Analysis of this anomaly. The type of the anomaly is either 'dropout' or 'threshold' or 'spike'. In case of a dropout, no affected measure is listed, because a dropout corresponds to no data reception for all air quality attributes. By clicking the button 'Show', you reach the line chart of the Data Analysis for the anomaly. In case of a threshold or a spike, the points which meet the anomaly condition are highlighted.

#### Data Analysis

The Data Analysis consists of a time range picker, a chart and a table. You can adjust the time range of sensor data values, which are plotted in the line chart and listed in the table, by selecting a start date and end date in the time range picker. The number of currently plotted and listed timestamps is shown right to the title Data Analysis. All air quality attributes are listed in a legend above the chart and in the head of the table. Their meaning can be found under <https://waqi.info>.

![alt text][device_line_chart]

The plot of an air quality attribute can be deactivated and activated by clicking on its icon in the legend. In this case, the chart rescales.

![alt text][device_bar_chart]

By clicking on a timestamp in the line chart, a bar chart appears, where you can compare the concentrations of the air quality attribute at this timestamp.

![alt text][device_table]

In the table, you can read the values of all attributes and of all timestamps, which are included in the linechart.

## Usage of the API

How to use the API please check (https://github.com/HEIOT/ise_2019_backend)
