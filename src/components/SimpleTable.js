import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import 'react-table-v6/react-table.css'

function sansAccent(chaine) {
    const accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    const noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    var str = chaine;
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
}

function filterCaseInsensitive(filter, allrow) {
    let row = allrow
    if (filter.id === "name" && row.name.props) {
        row = row.name.props.children[1]
        return (row ? String(sansAccent(row.toLowerCase())).includes(sansAccent(filter.value.toLowerCase())) : true);
    }
    if (filter.id === "ranking" && row.ranking.props) {
        row = row.ranking.props.children[1].props.children
        return (row.toString() === filter.value);
    }
    const id = filter.pivotId || filter.id;
    if (row[id] === undefined || row[id] === null) return false
    const strValue = row[id].toString()
    return (strValue ? String(sansAccent(strValue.toLowerCase())).includes(sansAccent(filter.value.toLowerCase())) : true);
}

class SimpleTable extends Component {

    onChangeSort = (e) => {
        localStorage.setItem("sorted", JSON.stringify(e))
        this.forceUpdate()
    }

    onChangePage = (e) => {
        localStorage.setItem("page", e)
        this.forceUpdate()
    }

    // ────────────────────────────────────────────────────────────────────────────────
    // ─── RENDER ─────────────────────────────────────────────────────────────────────
    // ────────────────────────────────────────────────────────────────────────────────

    render() {
        let { columns, data, ...others } = this.props
        if (!data)
            return ''

        let sorted = []
        if (localStorage.getItem("sorted")) sorted = JSON.parse(localStorage.getItem("sorted"))

        let page = 0
        if (localStorage.getItem("page")) page = localStorage.getItem("page")

        return (
                <ReactTable
                    className="-striped -highlight"
                    onSortedChange={this.onChangeSort}
                    onPageChange={this.onChangePage}
                    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}
                    sorted={sorted}
                    page={parseInt(page, 10)}
                    minRows={1}
                    multiSort={false}
                    columns={columns}
                    noDataText={"Player not in database"}
                    {...others}
                    data={data}
                />
        );
    }

}

export default SimpleTable;

/*const languageOptions = {
      // Text
      previousText: i18n[LANG]._word._prev,
      nextText: i18n[LANG]._word._next,
      loadingText: i18n[LANG]._word._loading + '...',
      noDataText: "",// i18n[LANG]._word._no_data_available,
      pageText: i18n[LANG]._word._page,
      ofText: i18n[LANG]._word._of,
      rowsText: i18n[LANG]._word._lines,
      // Accessibility Labels
      pageJumpText: i18n[LANG]._word._go_to_the_page,
      rowsSelectorText: i18n[LANG]._word._lines_per_page,
      /////////////////,
      //className: "-striped"
  }
  <ReactTable   {...languageOptions}/>
     */
