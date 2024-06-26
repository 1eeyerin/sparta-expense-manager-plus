import styled from 'styled-components';
import useShallowSelector from '@/hooks/useShallowSelector';
import { Button } from '@/components/Button';
import usePostsStore from '@/zustand/usePostsStore';

const MonthlyFilter = () => {
  const { updateSelectedMonth, month } = useShallowSelector(
    usePostsStore,
    (state) => ({
      updateSelectedMonth: state.updateSelectedMonth,
      month: state.selectedMonth,
    }),
  );

  const onUpdate = (event) => {
    const dataMonth = parseInt(event.target.dataset.month, 10);
    if (!dataMonth) return;

    updateSelectedMonth(dataMonth);
  };

  return (
    <StyledForm onClick={onUpdate}>
      {Array.from({ length: 12 }).map((_, index) => {
        const currentMonth = index + 1;

        return (
          <li key={currentMonth}>
            <Button
              fullWidth
              data-month={currentMonth}
              variant={month === currentMonth ? '' : 'secondary'}
            >
              {currentMonth}월
            </Button>
          </li>
        );
      })}
    </StyledForm>
  );
};

const StyledForm = styled.ul`
  grid-template-columns: repeat(6, minmax(0, 1fr));
  display: grid;
  gap: 32px;
  padding: 24px;
  background-color: var(--color-base-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`;

export default MonthlyFilter;
