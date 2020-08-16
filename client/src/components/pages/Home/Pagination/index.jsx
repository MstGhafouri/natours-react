import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { scroller } from 'react-scroll';

import { fetchTours } from '../../../../redux/actions/tour';

class Paginate extends React.Component {
  state = {
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: false,
    showPreviousAndNextNav: true,
    totalPages: Math.ceil(this.props.totalDocuments / 6),
    limit: 6
  };

  componentDidUpdate(prevProps) {
    const { totalDocuments, page } = this.props;

    prevProps.totalDocuments !== totalDocuments &&
      this.setState({
        totalPages: Math.ceil(totalDocuments / this.state.limit)
      });

    prevProps.page !== page && this.setState({ activePage: page });
  }

  handlePaginationChange = (e, { activePage }) => {
    this.scrollToSection('header');
    this.props.fetchTours({ page: activePage });
    this.setState({ activePage });
  };

  scrollToSection = sectionName => {
    scroller.scrollTo(sectionName, {
      duration: 700,
      smooth: true,
      delay: 10,
      offset: -100
    });
  };

  render() {
    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages
    } = this.state;

    return (
      <Pagination
        pointing
        secondary
        activePage={activePage}
        boundaryRange={boundaryRange}
        onPageChange={this.handlePaginationChange}
        size="massive"
        siblingRange={siblingRange}
        totalPages={totalPages}
        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
        ellipsisItem={showEllipsis ? undefined : null}
        firstItem={showFirstAndLastNav ? undefined : null}
        lastItem={showFirstAndLastNav ? undefined : null}
        prevItem={showPreviousAndNextNav ? undefined : null}
        nextItem={showPreviousAndNextNav ? undefined : null}
      />
    );
  }
}

const mapStateToProps = ({ totalDocuments, queryParams: { page } }) => {
  return { totalDocuments, page };
};

export default connect(mapStateToProps, { fetchTours })(Paginate);
