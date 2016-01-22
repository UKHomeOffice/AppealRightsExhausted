'use strict';

module.exports = {

  getstaticAppealStages: function() {

   return [
      { 'value': 'FT_IC',
        'label': '01. First Tier IAC Appeal - In Country Appeals',
        'timeLimit': {'value': 14, 'type': 'calendar'},
        'startDateLabel': 'Date Refusal letter sent by HO',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014',
        'ruleNumber': '19(2)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'Refusal Notice',
        'sortCode': 10
      },

      { 'value': 'FT_OOC_1',
        'label': '02. First Tier IAC Appeal - Out of Country Appeals where the appellant must leave the UK before appealing',
        'timeLimit': {'value': 28, 'type': 'calendar'},
        'startDateLabel': 'Appellants date of departure',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014',
        'ruleNumber': '19(3)(a)',
        'adminAllowance': {'value': 0, 'type': 'working'},
        'country': 'All',
        'trigger': 'Refusal Notice',
        'sortCode': 20
      },

      { 'value': 'FT_OOC_2',
        'label': '03. First Tier IAC Appeal - Other out of Country Appeals (e.g Voluntary Departure)',
        'timeLimit': {'value': 28, 'type': 'calendar'},
        'startDateLabel': 'Date of receipt of the Refusal letter',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014',
        'ruleNumber': '19(3)(b)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'Refusal Notice',
        'sortCode': 30
      },

      { 'value': 'FT_IC_FAST',
        'label': '04. First Tier IAC Appeal - In Country Detained Fast Track',
        'timeLimit': {'value': 2, 'type': 'working'},
        'startDateLabel': 'Start Date (tbc)',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014 Schedule The Fast Track Rules',
        'ruleNumber': '5(1)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'Refusal Notice',
        'sortCode': 40
      },

      { 'value': 'FT_UT_IC',
        'label': '05. First Tier IAC PTA to the UT - In Country',
        'timeLimit': {'value': 14, 'type': 'calendar'},
        'startDateLabel': 'Date written reasons for the decision sent',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014',
        'ruleNumber': '33(2)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'IA60 first tier dismissed',
        'sortCode': 50
      },

      { 'value': 'FT_UT_OOC',
        'label': '06. First Tier IAC PTA to the UT - Out of Country',
        'timeLimit': {'value': 28, 'type': 'calendar'},
        'startDateLabel': 'Date written reasons for the decision sent',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014',
        'ruleNumber': '33(3)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'IA60 first tier dismissed',
        'sortCode': 60
      },

      { 'value': 'FT_UT_FAST',
        'label': '07. First Tier IAC PTA to the UT - Detained Fast Track',
        'timeLimit': {'value': 3, 'type': 'working'},
        'startDateLabel': 'Start Date (tbc)',
        'rules': 'The Tribunal Procedure (First-tier tribunal) (Immigration and Asylum Chamber) Rules 2014 Schedule The Fast Track Rules',
        'ruleNumber': '11',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'IA60 first tier dismissed',
        'sortCode': 70
      },

      { 'value': 'UT_IC',
        'label': '08. Upper Tribunal IAC PTA - In Country',
        'timeLimit': {'value': 14, 'type': 'calendar'},
        'startDateLabel': 'Start Date (tbc)',
        'rules': 'The Tribunal Procedure (Upper Tribunal) Rules 2008',
        'ruleNumber': '21(3)(a)(aa)(i)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'IA67 first tier permission to appeal refused',
        'sortCode': 80
      },

      { 'value': 'UT_OOC',
        'label': '09. Upper Tribunal IAC PTA - Out of Country',
        'timeLimit': {'value': 1, 'type': 'calendarmonth'},
        'startDateLabel': 'Start Date (tbc)',
        'rules': 'The Tribunal Procedure (Upper Tribunal) Rules 2008',
        'ruleNumber': '21(3)(b)',
        'adminAllowance': {'value': 1, 'type': 'working'},
        'country': 'All',
        'trigger': 'IA67 first tier permission to appeal refused',
        'sortCode': 90
      }

    ];

  }
};
