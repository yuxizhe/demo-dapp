import React, { Component } from 'react'

import ListingForm from './listing-form'

// Make this a relative URL
class Schema extends React.Component {
  render() {
    return (
      <div className="schema-option">
        <div className="img-wrapper">
          <img src={'/' + this.props.schema.img}
            onClick={() => this.props.onSelection()}
            alt={this.props.schema.name}
            />
        </div>
        <h4 onClick={() => this.props.onSelection()}>
          {this.props.schema.name}
        </h4>
      </div>
    )
  }
}

class SchemaOptions extends React.Component {
  renderSchema(schema) {
    return (
      <Schema
        schema={schema}
        onSelection={() => this.props.onSchemaSelection(schema)}
      />
    )
  }

  render() {
    return (
      <div className="schema-options">
        <div className="row">
          {this.props.schemaList.map((schema) => {
            return (
              <div className="col-md-4" key={schema.type}>
                {this.renderSchema(schema)}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

class ListingCreate extends Component {

  constructor(props) {
    super(props)

    this.schemaList = [
      {type: 'for-sale', name: 'For Sale', 'img': 'for-sale.jpg'},
      {type: 'housing', name: 'Housing', 'img': 'housing.jpg'},
      {type: 'transportation', name: 'Transportation', 'img': 'transportation.jpg'},
      {type: 'tickets', name: 'Tickets', 'img': 'tickets.jpg'},
      {type: 'services', name: 'Services', 'img': 'services.jpg'},
      {type: 'announcements', name: 'Announcements', 'img': 'announcements.jpg'},
    ]

    this.state = {
      selectedSchemaType: this.schemaList[0],
      selectedSchema: null,
      schemaFetched: false
    }

    this.handleSchemaSelection = this.handleSchemaSelection.bind(this)
    this.handleSchemaSelection(this.schemaList[0])
  }

  handleSchemaSelection(schemaType) {
    // Need to change this to a non local URL
    fetch('/schemas/' + schemaType.type + '.json')
    .then((response) => response.json())
    .then((schemaJson) => {
      this.setState({
        selectedSchemaType: schemaType,
        selectedSchema: schemaJson,
        schemaFetched: true
      })
    })
  }

  render() {
    console.log("Rendering ListingCreate")

    return (
      <section className="step">
        <h3>Create your first decentralized listing on Origin</h3>
        <h4>Choose a schema for your product or service</h4>
        <p>
          Your product or service will use a schema to describe its
          attributes like name, description, and price. Origin already
          has multiple schemas that map to well-known
          categories of listings like housing, auto, and services.
        </p>
        <p>
          These are <a href="http://json-schema.org" target="_blank">
          JSON schema</a> definitions that describe the required fields
          and validation rules for each type of listing. If your listing
          type is unsupported, you can easily extend our schemas or
          create your own.
        </p>
        <SchemaOptions
          schemaList={this.schemaList}
          onSchemaSelection={this.handleSchemaSelection} />
        <hr>
        </hr>
        <div className="row">
          <div className="col-md-12">
            {this.state.schemaFetched &&
              <h4>
                {this.state.selectedSchemaType.name}
              </h4>
            }
            {this.state.schemaFetched &&
              <ListingForm
                schema={this.state.selectedSchema}
                selectedSchemaType={this.state.selectedSchemaType}
                onSubmitListing={this.props.onStep1Completion}/>
            }
          </div>
          <div className="col-md-6">
          </div>
        </div>
      </section>
    );
  }
}

export default ListingCreate
